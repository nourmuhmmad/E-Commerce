import { catchError } from "../middleware/catchError.js"

export const deleteOne = (model) =>{
    return catchError(async(req,res,next)=>{
        let subcategory = await model.findByIdAndDelete(req.params.id)
        !subcategory && res.status(404).json({message:"subCategory Not Found"})
        subcategory && res.json({message:"Success",subcategory})
    })
    
}

export const getalldocuments = (model) => {
    return catchError(async (req, res, next) => {
      let documents = await model.find({});
      res.json({ message: "documents:", documents });
    });
  };
  
  export const getone = (model) => {
    return catchError(async (req, res, next) => {
      let document = await model.findById(req.params.id);
      !document && res.status(404).json({ message: "document not found" });
      document && res.json({ message: "success", document });
    });
  };
  