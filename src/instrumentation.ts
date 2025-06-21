import App from "next/app";
import { connectDB } from "./components/lib/connectDB";
// import {connectDB} from "./app/lib/db"

export function register(){
    connectDB();
}