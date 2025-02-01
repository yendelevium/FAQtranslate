import FAQ from "../models/faq.js"
import translateText from "../utils/translateText.js";

async function getFAQs (req,res){    
    const {lang} = req.query
    const fetchedFAQs = await FAQ.find({});
    const translatedFAQs = await Promise.all(
        fetchedFAQs.map(async (ele) => {
            // Translating the fetched records to the specified language
            const question = await translateText(ele.question,lang)
            const answer = await translateText(ele.answer,lang)
            return{
                ...ele.toObject(),
                question,
                answer
            }
        })
    );
    
    res.json(translatedFAQs)
}

async function addFAQ (req,res){
    const FAQdata = req.body;
    console.log(FAQdata)
    // Validation
    if (FAQdata.question == "" || FAQdata.answer==null){
        res.json({
            message:"Question/Answer cannot be empty"
        })
    }
    // Translating all records so that they are always saved in english
    // This is to make sure the data is stored in a uniform manner
    FAQdata.question = await translateText(FAQdata.question)
    FAQdata.answer = await translateText(FAQdata.answer)

    const newFAQ = new FAQ(FAQdata);
    await newFAQ.save()
    res.json(newFAQ)
}

async function deleteFAQ (req,res){
    const {faqId} = req.params;
    const deletedFAQ = await FAQ.findByIdAndDelete(faqId)
    res.json({message:"Deleted the FAQ", data : deletedFAQ});
}

export default {getFAQs, addFAQ, deleteFAQ}