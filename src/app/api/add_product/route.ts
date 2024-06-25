import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { imgSrc, fileKey, name, category, price, navCategory, subNavCategory } = body;
        console.log(imgSrc, fileKey, name, category, price, navCategory, subNavCategory);
        
        await connectMongoDB()
        const data = await Product.create({
            imgSrc, fileKey, name, category, price, navCategory, subNavCategory
        })

        console.log(data)
        if (!data) {
            return NextResponse.json({msg: "Product not added Successfully", data});
        }
        return NextResponse.json({msg: "Product Added Successfully", data});
    } catch (error) {
        return NextResponse.json({
            error,
            message: "Something went wrong",
        }, 
        {status: 400}
    )
    }
}