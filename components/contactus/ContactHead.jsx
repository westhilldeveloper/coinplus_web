// components/ContactUs.tsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactHead = () => {
  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8 font-sans">
      <h1 className="text-xl md:text-2xl font-bold text-primary mb-6 md:mb-8">Contact Us</h1>

      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
        {/* 左侧联系信息 */}
        <div className="w-full lg:w-2/5 mb-6 lg:mb-10">
          <h2 className="text-md md:text-lg font-semibold text-gray-800 mb-2">
            Monday - Saturday
          </h2>
          
          <div className="space-y-2 text-gray-700">
            <p className="text-md">10 am - 7 pm</p>
            
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <a 
                href="mailto:enrol@Finovest.com" 
                className="text-sm md:text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                enrol@Finovest.com
              </a>
            </div>
            
            {/* 电话号码 */}
            <div className="mt-4 md:mt-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <span className="font-semibold text-sm md:text-base text-gray-800">Bangalore</span>
                </div>
                <p className="text-sm md:text-base font-medium text-gray-900">1800 425 7373</p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <span className="font-semibold text-sm md:text-base text-gray-800">Chennai</span>
                </div>
                <p className="text-sm md:text-base font-medium text-gray-900">1800 425 0022</p>
              </div>
              
              <div className="">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <span className="font-semibold text-sm md:text-base text-gray-800">Hyderabad</span>
                </div>
                <p className="text-sm md:text-base font-medium text-gray-900">1800 425 8884</p>
              </div>
            </div>
          </div>
        </div>

        {/* 分隔线 - 只在桌面显示 */}
        <hr className="hidden lg:block my-8 border-gray-300 w-px h-auto" />

        {/* 右侧办公地址 */}
        <div className="w-full lg:w-3/5">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
            You can reach us at:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 justify-start">
            {/* 海得拉巴总部 */}
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
              <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">
                Finovest Chits & Kuries Pvt Ltd. Tamil Nadu (Head office)
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-600 mt-1 flex-shrink-0" />
                  <p className="text-xs md:text-sm">
                    Building No/Flat No.209, Udumalai Road, Appolo Pharmacy, Pollachi, Coimbathore 642001
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <p className="text-xs md:text-sm">
                    <span className="font-semibold">Phone:</span> +91 97460 03484 
                  </p>
                </div>
              </div>
            </div>

            {/* 钦奈办公室 */}
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
              <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">
                FINOVEST GROUP. kerala (Regional office)
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-600 mt-1 flex-shrink-0" />
                  <p className="text-xs md:text-sm">
                    MADATHILAYATHU BUILDINGS, NEAR KAIRALI LAB, KODUMON
PIN: 691555

                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <p className="text-xs md:text-sm">
                    <span className="font-semibold">Phone:</span> 0473-4270040  +91 97460 03484
                  </p>
                </div>
              </div>
            </div>

            {/* 班加罗尔办公室 */}
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm">
              <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">
                Finovest Chits (Karnataka) Pvt Ltd. Karnataka (Regional office)
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-600 mt-1 flex-shrink-0" />
                  <p className="text-xs md:text-sm">
                    Plot No: 212, 3rd Floor, Opp. Gate No: 9 of Palace Grounds, 
                    Ballari Main Road, Sadashiva Nagar, BENGALURU - 560080, Karnataka, India
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <p className="text-xs md:text-sm">
                    <span className="font-semibold">Phone:</span> 25322939
                  </p>
                </div>
              </div>
            </div>

            {/* 查看所有分支机构链接 */}
            <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-300 shadow-sm flex items-center justify-center">
              <a
                href="/branches"
                className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 text-primary font-semibold transition-colors duration-200 hover:text-primary-dark"
              >
                View All Branches
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHead;