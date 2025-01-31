// A wrapper function to catch async errros(instead of having to wrap every route with a try-catch)
export default function catchAsync(func){
    return (req,res,next)=>{
        func(req,res,next)
            .catch(err=>next(err))
    }
}