import { ColorKey, Phone } from "../types";

export const PHONE_COLORS: Record<ColorKey, { label: string; hex: string; image: number }> = {
  silver: { label: "bạc",  hex: "#C9EEFA", image: require("../../assets/phones/silver.png") },
  red:    { label: "đỏ",   hex: "#E53A2F", image: require("../../assets/phones/red.png") },
  black:  { label: "đen",  hex: "#000000", image: require("../../assets/phones/black.png") },
  blue:   { label: "xanh", hex: "#2A4494", image: require("../../assets/phones/blue.png") },
};
export const COLOR_ORDER: ColorKey[] = ["silver", "red", "black", "blue"]; 

const BADGE = "Ở ĐÂU RẺ HƠN HOÀN TIỀN";
const make = (id: string, name: string, price: number, oldPrice: number, rating: number,
  reviewCount: number, defaultColor: ColorKey): Phone => ({
  id, name, price, oldPrice, rating, reviewCount,
  supplier: "Tiki Tradding", badge: BADGE, colors: COLOR_ORDER, defaultColor,
});

export const PHONES: Phone[] = [
  make("1", "Điện Thoại Vsmart Joy 3 - Hàng chính hãng", 1790000, 1790000, 5, 828, "blue"),
  make("2", "Điện Thoại Vsmart Live 4 - Hàng chính hãng", 3990000, 4490000, 5, 512, "red"),
  make("3", "Điện Thoại Vsmart Star 5 - Hàng chính hãng", 2490000, 2690000, 4, 340, "black"),
  make("4", "Điện Thoại Vsmart Active 3 - Hàng chính hãng", 3490000, 3990000, 4, 276, "silver"),
  make("5", "Điện Thoại Vsmart Aris Pro - Hàng chính hãng", 7990000, 8990000, 5, 189, "blue"),
  make("6", "Điện Thoại Vsmart Bee 3 - Hàng chính hãng", 1290000, 1490000, 4, 604, "red"),
];
