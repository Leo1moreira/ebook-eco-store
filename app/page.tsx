'use client';
import { useState } from 'react';
export default function Home(){
  const [email,setEmail]=useState(''); 
  const [loading,setLoading]=useState(false);
  const submit=async(e:any)=>{
    e.preventDefault(); 
    setLoading(true);
    const res=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});
    const data=await res.json(); 
    setLoading(false);
    if(data?.url) window.location.href=data.url; 
    else alert('Erro: '+JSON.stringify(data));
  }
  return (
    <div style={{maxWidth:640,margin:'0 auto',background:'#fff',padding:24,borderRadius:16}}>
      <h1>Ebook Eco - 152 páginas</h1>
      <p>De R$47 por R$14,90 - Acesso imediato após PIX</p>
      <form onSubmit={submit}>
        <input required type="email" placeholder="Seu melhor email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:12,borderRadius:8,border:'1px solid #ccc',marginBottom:12}}/>
        <button disabled={loading} type="submit" style={{width:'100%',background:'#2e7d32',color:'#fff',padding:12,borderRadius:8,border:0}}>{loading?'Gerando PIX...':'Gerar PIX de R$14,90'}</button>
      </form>
    </div>
  )
}
