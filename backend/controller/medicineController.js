import medicineModel from '../model/medicineModel.js';
import AppError from '../utilites/AppError.js';
import catchError from '../utilites/catchError.js';

class medicineController {

    static getAllMedicine = catchError(async(req,res,next)=> {
      const data = await medicineModel.find()
      res.json(data);

      if (!data) {
        return next(new AppError('Medicines not found', 404))
      }
 } )
    

    static getOneMedicineById = catchError(async (req, res,next) => {
      const medicineID = req.params.id;
      const result = await medicineModel.findOne({ _id: medicineID });

      if (!result) {
        return next(new AppError('Medicines not found',404))
      } 
      res.statue(200).json ({
        status :true , 
        message : result
      })
   })

   static getCategory = catchError(async (req, res, next) => {
    
      const category = req.params.category; // Assuming the category is passed as a route parameter
      const medicines = await medicineModel.find({ category });
  
      if (medicines.length === 0) {
        return next(new AppError('No medicines found in this category', 404));
      }
  
      res.status(200).json({
        status: 'success',
        medicines
  
      });
    } 
);

static getCategoriesNamesOnly = catchError(async (req, res, next) => {
  const category = req.params.category; // Assuming the category is passed as a route parameter
    const medicines = await medicineModel.find('id category');

    if (medicines.length === 0) {
      return next(new AppError('No medicines found in this category', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        medicines
      }
    });

 } )
      static createMedicine = catchError(async (req,res,next) =>{
      const newMedicineData = req.body;
        const existingMedicine = await medicineModel.findOne({ _id: newMedicineData.id });
        if (existingMedicine) {
          return next(new AppError('Medicine already exists',409))
        } else {
           const result = await medicineModel.insertMany(newMedicineData);
           res.status(200).json ({
            status :true , 
            message : result
          })
          }
    } )
////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    static deleteMedicineById =catchError(async (req, res) => {
 
          const id = req.params.id
          const result = await medicineModel.findByIdAndDelete({ _id:id });
          res.status(200).json('medicine deleted successfully');
          if(!result){
            return next(new AppError('Medicine not found',404))
          }
          
    })
 
    static updateMedicine =catchError( async (req, res) => {

          const id = req.params.id;
          const medicine = await medicineModel.findByIdAndUpdate(id, req.body, { new: true })
          if (medicine) {
              res.statue(200).json(medicine);
          } else {
            return next(new AppError('Medicines not found',404))
          }
})

}


export default medicineController