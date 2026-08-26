import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function POST(req:NextRequest){
  const body=await req.json().catch(()=>null);
  const event=body?.event || body?.data?.event || '';
  const billing=body?.data || body;
  const nsu=billing?.products?.[0]?.externalId || billing?.billing?.products?.[0]?.externalId;
  const status=billing?.status || billing?.billing?.status || '';
  if(!nsu) return NextResponse.json({ok:false});
  if(status==='PAID' || event==='billing.paid'){
    await prisma.order.updateMany({where:{nsu},data:{status:'paid',paidAt:new Date()}});
  }
  return NextResponse.json({ok:true});
}
