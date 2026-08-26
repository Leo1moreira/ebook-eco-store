import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPixPayment } from '@/lib/abacatepay';
export async function POST(req:NextRequest){
  const {email}=await req.json();
  if(!email) return NextResponse.json({error:'email required'},{status:400});
  const nsu=`eco-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
  const amount=Number(process.env.EBOOK_PRICE||1490);
  await prisma.order.create({data:{email,nsu,amount,status:'pending'}});
  try{
    const billing=await createPixPayment(email,nsu,amount);
    const url=billing?.data?.url || billing?.url;
    return NextResponse.json({url,nsu,billing});
  }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
