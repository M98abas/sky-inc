import Cookies from "js-cookie";
import create from "zustand";

// let lang: any = "ar";
let lang: any;
lang = Cookies.get("lang");
const useTitleStore = create(() =>
  lang == "en"
    ? {
        items: "Items",
        users: "Users",
        numberOfUsage: "Number of usage",
        home: "Home",
        admin: "Admins",
        products: "Products",
        category: "Category",
        menu: "Menu",
      }
    : {
        items: "قطع",
        users: "المستخدمين",
        numberOfUsage: "عدد المستخدمين",
        home: "الصفحة الرئيسية",
        admin: "المسؤؤلين",
        products: "المنتجات",
        category: "التصنيفات",
        menu: "القائمة",
      }
);

export default useTitleStore;
