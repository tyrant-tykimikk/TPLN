
import React, { useState } from 'react';
import { InputField } from './components/ui/InputField';
import { FileUpload } from './components/ui/FileUpload';
import { SignaturePad } from './components/ui/SignaturePad';
import { FormData, ApplicantType } from './types';
import { 
  TERMS_TEXT_PAGE_2,
} from './constants';

// Customized SVG representation of the TPLN Logo
// Matching the reference: 
// - Bold, rounded teal font.
// - N letter has NO right vertical line (just left vertical + diagonal).
// - Orange triangle accent in the top-right corner.
// - Triangle is shifted right (x=165) per user request, slightly overhanging the N.
// - Triangle moved up to y=12 per user request.
// - Triangle hypotenuse remains parallel to N diagonal.
const TplnLogo = () => (
  <svg viewBox="0 0 185 55" className="w-full h-full max-h-14" aria-label="TPLN Logo">
    <defs>
      <style>
        {`
          .tpln-text { fill: none; stroke: #2cb69d; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
          .tpln-accent { fill: #f5a623; stroke: none; }
        `}
      </style>
    </defs>
    
    {/* T */}
    <path d="M15 15 H 40" className="tpln-text" />
    <path d="M27.5 15 V 45" className="tpln-text" />
    
    {/* P */}
    <path d="M55 45 V 15 H 68 C 80 15 80 32 68 32 H 55" className="tpln-text" />
    
    {/* L */}
    <path d="M95 15 V 45 H 120" className="tpln-text" />
    
    {/* N - No right vertical line */}
    {/* Vertical left (135,45 -> 135,15), then diagonal down-right (135,15 -> 160,45) */}
    <path d="M135 45 V 15 L 160 45" className="tpln-text" />
    
    {/* Orange Triangle - Top Right of N */}
    {/* Shifted up to y=12 per request */}
    {/* Top-Right(165,12), Top-Left(150,12) */}
    {/* Bottom-Right adjusted to 30 to maintain parallel slope (1.2) with N */}
    <path d="M150 12 L 165 12 L 165 30 Z" className="tpln-accent" />
  </svg>
);

const App: React.FC = () => {
  const [data, setData] = useState<FormData>({
    idFront: null,
    idBack: null,
    applicantName: '',
    applicantType: ApplicantType.INDIVIDUAL,
    idNumber: '',
    birthDateOrFoundingDate: '',
    email: '',
    phone: '',
    address: '',
    bankName: '',
    branchName: '',
    accountName: '',
    accountNumber: '',
    bankCover: null,
    signature1: null,
    signature2: null,
    agreedToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Common border styles to replicate the table look
  const cellClass = "p-2 border-r border-black last:border-r-0";
  const labelClass = "font-bold text-sm block mb-1";
  const sectionHeaderClass = "bg-gray-100 font-bold text-sm p-1 border-b border-black";

  return (
    <div className="min-h-screen bg-gray-100 py-4 md:py-8 px-2 md:px-0 text-black font-sans flex justify-center">
      <div className="w-full max-w-[210mm] bg-white shadow-xl p-4 md:p-8 box-border">
        
        {/* Main Table Container */}
        <div className="border-2 border-black flex flex-col">
          
          {/* --- HEADER SECTION --- */}
          <div className="flex border-b border-black">
             {/* Logo Column */}
             <div className="w-[25%] md:w-[20%] border-r border-black flex items-center justify-center p-2 md:p-4">
                <TplnLogo />
             </div>
             
             {/* Company Info Column */}
             <div className="w-[75%] md:w-[80%] p-2 text-center flex flex-col justify-center">
                <h1 className="text-lg md:text-xl font-bold mb-1 tracking-wider">為愛發光教育科技有限公司</h1>
                <h2 className="text-sm md:text-md font-bold mb-1 leading-tight">會員升級服務商申請暨協議書(內含產品訂購協議書)-TW</h2>
                <div className="text-[10px] leading-tight mt-1">
                  電話:02-23036122 客服信箱:cs@ienglishtw.com 地址:台北市大安區復興南路2段35號3樓之2
                </div>
             </div>
          </div>

          {/* Service Provider ID Row */}
          <div className="border-b border-black p-2 flex items-center h-10 bg-white">
            <span className="font-bold text-sm mr-2 flex-shrink-0">服務商識別號碼：</span>
            {/* Read-only field explicitly marked for company use */}
            <div className="flex-1 bg-gray-200 border-b border-gray-400 h-8 px-2 flex items-center">
              <span className="text-gray-500 text-sm">(由公司填寫)</span>
            </div>
          </div>

          {/* --- PAGE 1 CONTENT --- */}
          
          {/* ID Upload Section */}
          <div className="flex border-b border-black h-48">
            <div className="w-1/2 border-r border-black relative group hover:bg-gray-50 transition-colors">
              <FileUpload 
                label="將證件影本黏貼此處<br/>身份證影本(正面)實貼處"
                file={data.idFront}
                onFileChange={(f) => setData(prev => ({ ...prev, idFront: f }))}
                className="h-full"
              />
            </div>
            <div className="w-1/2 relative group hover:bg-gray-50 transition-colors">
               <FileUpload 
                label="將證件影本黏貼此處<br/>身份證影本(反面)實貼處"
                file={data.idBack}
                onFileChange={(f) => setData(prev => ({ ...prev, idBack: f }))}
                className="h-full"
              />
            </div>
          </div>

          {/* Disclaimer Text */}
          <div className="p-2 text-[10px] border-b border-black leading-tight text-justify">
            服務商將會獲得一個經指定之服務商編號,以使用於其會籍内與iEnglish産品和為愛發光公司間所有交易活動。服務商必須確保以下所提供的資料均為屬實且正確， 並且同意如果該資料為虛假不實或有誤導情事時，iEnglish得宣告本合約自始作廢無效。
          </div>

          {/* Step 1 Header */}
          <div className={sectionHeaderClass}>
            步驟 — 新帳號資料<br/>
            <span className="font-normal text-[10px] block mt-0.5">個人(唯一參與人)&gt;最新之身份證正反面影本,務必清晰,不可以其他證件代替。<br/>
            《營利事業》法定代理人/負責人最新之身份證正反面影本及附上公司及商業登記證明文件。</span>
          </div>

          {/* Step 1 Grid */}
          <div className="grid grid-cols-2 text-sm">
            {/* Row 1 */}
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>服務商姓名</label>
              <span className="text-[10px] text-gray-500 block mb-1">(先寫姓氏，姓名必須為身份證明文件上的姓名；若為營利事業，請寫營利事業的全名)</span>
              <InputField 
                name="applicantName"
                value={data.applicantName}
                onChange={handleInputChange}
              />
            </div>
            <div className={`col-span-1 ${cellClass} border-b bg-yellow-50`}>
              <label className={labelClass}>申請人乃屬 (請選擇一項)</label>
              <div className="flex flex-col space-y-2 mt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="applicantType"
                    value={ApplicantType.INDIVIDUAL}
                    checked={data.applicantType === ApplicantType.INDIVIDUAL}
                    onChange={() => setData(prev => ({ ...prev, applicantType: ApplicantType.INDIVIDUAL }))}
                    className="w-4 h-4 text-black border-black focus:ring-0"
                  />
                  <span>個人</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="applicantType"
                    value={ApplicantType.BUSINESS}
                    checked={data.applicantType === ApplicantType.BUSINESS}
                    onChange={() => setData(prev => ({ ...prev, applicantType: ApplicantType.BUSINESS }))}
                    className="w-4 h-4 text-black border-black focus:ring-0"
                  />
                  <span>營利事業</span>
                </label>
              </div>
            </div>

            {/* Row 2 */}
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>身份證號碼 / 營利事業統一編號</label>
              <InputField 
                name="idNumber"
                value={data.idNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>出生日期 / 營利事業開業日期</label>
              <InputField 
                type="date"
                name="birthDateOrFoundingDate"
                value={data.birthDateOrFoundingDate}
                onChange={handleInputChange}
              />
            </div>

            {/* Row 3 */}
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>電子信箱</label>
              <InputField 
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>電話號碼</label>
              <InputField 
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleInputChange}
              />
            </div>

            {/* Row 4 */}
            <div className={`col-span-2 ${cellClass} border-b`}>
              <label className={labelClass}>通訊 / 郵寄地址</label>
              <InputField 
                name="address"
                value={data.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className={sectionHeaderClass}>
            步骤二<br/>
            <span className="font-normal text-sm block mt-0.5">以新臺幣13200元預購三臺硬體。</span>
          </div>

          {/* Step 3 Header */}
          <div className={sectionHeaderClass}>
            步驟三 奬金之直接匯款<br/>
            <span className="font-normal text-[10px] block mt-0.5">本人同意授權公司將本人的奬金轉帳匯入本人的以下銀行帳號(請附上您的銀行存摺封面影印本以作為核對銀行帳號之用)</span>
          </div>

          {/* Step 3 Bank Grid */}
          <div className="grid grid-cols-2 text-sm">
            {/* Row 1 */}
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>金融機構名稱</label>
              <InputField 
                name="bankName"
                value={data.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>分行/支局</label>
              <InputField 
                name="branchName"
                value={data.branchName}
                onChange={handleInputChange}
              />
            </div>

            {/* Row 2 */}
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>戶名</label>
              <InputField 
                name="accountName"
                value={data.accountName}
                onChange={handleInputChange}
              />
            </div>
            <div className={`col-span-1 ${cellClass} border-b`}>
              <label className={labelClass}>帳號</label>
              <InputField 
                name="accountNumber"
                value={data.accountNumber}
                onChange={handleInputChange}
              />
            </div>

            {/* Row 3: Bank Book Upload */}
            <div className={`col-span-2 border-b border-black h-40 relative group hover:bg-gray-50 transition-colors`}>
               <FileUpload 
                label="將銀行存摺封面的影本黏貼此處"
                file={data.bankCover}
                onFileChange={(f) => setData(prev => ({ ...prev, bankCover: f }))}
                className="h-full"
              />
            </div>
          </div>

          {/* Signatures 1 */}
          <div className="flex border-b border-black">
             <div className="w-1/2 p-2 border-r border-black flex flex-col justify-center text-[10px] leading-relaxed">
               <p className="font-bold mb-1">本人特此簽名表示已接受告知事項並單獨簽署同意</p>
               <p>本人明白並填寫本協議書及簽名，即表示本人已詳閱本協議書正反兩面；並且願意遵守這份協議書背面所有條款和TPLN事業獎勵制度手冊</p>
             </div>
             <div className="w-1/2 p-2">
               <SignaturePad 
                 label="簽名"
                 onEnd={(sig) => setData(prev => ({ ...prev, signature1: sig }))}
               />
             </div>
          </div>

          {/* Signatures 2 */}
          <div className="flex">
             <div className="w-1/2 p-2 border-r border-black flex flex-col justify-center text-[10px] leading-relaxed">
               <p className="font-bold mb-1">本人特此簽名表示了解並接受該仲裁協議</p>
               <p>偽造他人簽名或用印，除該私文書無效外，行為人亦應負刑法僞造文書及僞造署押等罪責。</p>
             </div>
             <div className="w-1/2 p-2">
               <SignaturePad 
                 label="簽名"
                 onEnd={(sig) => setData(prev => ({ ...prev, signature2: sig }))}
               />
             </div>
          </div>

        </div>

        {/* --- PAGE 2 (Text Content) --- */}
        <div className="mt-8 md:mt-16 pt-8 border-t-4 border-double border-gray-300 text-xs text-gray-600 leading-relaxed whitespace-pre-wrap text-justify font-serif">
           <h3 className="text-center font-bold text-sm mb-4 text-black font-sans">協議書條款 (Page 2)</h3>
           {TERMS_TEXT_PAGE_2}
        </div>

      </div>
    </div>
  );
};

export default App;
