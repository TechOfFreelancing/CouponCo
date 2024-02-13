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
        <div>
            <div className="px-5 max-w-[1280px] mx-auto">
                <ClothingBased></ClothingBased>
            </div>
            <div className="px-5 bg-white py-10">
                <Content2></Content2>
            </div>
            <div className="px-5 max-w-[1280px] mx-auto">
                <TravelBased></TravelBased>
                <HealthFitnessBased></HealthFitnessBased>
                <ElectronicsBased></ElectronicsBased>
                <HomeGardenBased></HomeGardenBased>
                <BeautyBased></BeautyBased>
                <FoodBeveragesBased></FoodBeveragesBased>
                <AccessoriesBased></AccessoriesBased>
            </div>
        </div>
    )
}

export default CategoriesbasedCoupons