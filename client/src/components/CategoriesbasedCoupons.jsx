import AccessoriesBased from "./CategoriesbasedCoupons/AccessoriesBased";
import BeautyBased from "./CategoriesbasedCoupons/BeautyBased";
import ClothingBased from "./CategoriesbasedCoupons/ClothingBased";
import ElectronicsBased from "./CategoriesbasedCoupons/ElectronicsBased";
import FoodBeveragesBased from "./CategoriesbasedCoupons/FoodBeveragesBased";
import HealthFitnessBased from "./CategoriesbasedCoupons/HealthFitnessBased";
import HomeGardenBased from "./CategoriesbasedCoupons/HomeGardenBased";
import TravelBased from "./CategoriesbasedCoupons/TravelBased";
import Content2 from "./content2";



const CategoriesbasedCoupons = () => {
    return (
        <div className='lg:mx-28 mx-5'>
            <ClothingBased></ClothingBased>
            <Content2></Content2>
            <TravelBased></TravelBased>
            <HealthFitnessBased></HealthFitnessBased>
            <ElectronicsBased></ElectronicsBased>
            <HomeGardenBased></HomeGardenBased>
            <BeautyBased></BeautyBased>
            <FoodBeveragesBased></FoodBeveragesBased>
            <AccessoriesBased></AccessoriesBased>
        </div>
    )
}

export default CategoriesbasedCoupons