import FAQ from "../models/faq.js"
import translateText from "../utils/translateText.js";
import redisHandler from "../utils/redis.js"

async function getFAQs (req,res){    
    const {lang} = req.query
    // Caching the translations
    const FAQs = await redisHandler.getOrSetCache(`language:${lang||"en"}`,async ()=>{
        const fetchedFAQs = await FAQ.find({});
        const translatedFAQs = [];
        for (const ele of fetchedFAQs) {
            const question = await translateText(ele.question, lang);
            const answer = await translateText(ele.answer, lang);
            translatedFAQs.push({ ...ele.toObject(), question, answer });
        }
        return translatedFAQs
    })
    res.json(FAQs);
}

// We clear the cache whenever we add/delete an FAQ, because if we don't the stuff in the cache won't get updated
// The next time we hit the GET /api/faq endpoint
async function addFAQ (req,res){
    const FAQdata = req.body;
    console.log(FAQdata)
    // Validation
    if (FAQdata.question == "" || FAQdata.answer==null){
        res.status(400).json({
            message:"Question/Answer cannot be empty"
        })
    }
    // Translating all records so they are always saved in english
    // This is to make sure the data is stored in a unifrom manner
    FAQdata.question = await translateText(FAQdata.question)
    FAQdata.answer = await translateText(FAQdata.answer)

    const newFAQ = new FAQ(FAQdata);
    await newFAQ.save()
    redisHandler.clearCache()
    res.status(201).json(newFAQ)
}

async function deleteFAQ (req,res){
    const {faqId} = req.params;
    const deletedFAQ = await FAQ.findByIdAndDelete(faqId)
    redisHandler.clearCache()
    res.json({message:"Deleted the FAQ", data : deletedFAQ});
}

export default {getFAQs, addFAQ, deleteFAQ}