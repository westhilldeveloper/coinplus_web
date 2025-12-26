'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  DollarSign,
  Calendar,
  Gavel,
  TrendingUp,
  Shield,
  Clock,
  Building,
  HeadphonesIcon,
  Youtube,
  Play,
  ExternalLink,
  Sparkles,
  Zap,
  Star,
  Target,
  Award,
  Users,
  Globe,
  Menu,
  X,
  Check,
  Circle
} from 'lucide-react';
import YouTubePlayer from './YouTubePlayer';

const ChitFundFAQ = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSection, setActiveSection] = useState('about-chit-fund');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  // YouTube Configuration
  const YOUTUBE_CHANNEL_ID = "UCZLUQLlKCXhQH_bvP4GmWHg";
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  // Sample video data
  const videoData = {
    'benefits': '7E_WfBXfTIg',
    'operation': 'zzz_HabBI3M',
    'payment': 'LT8mDipP92I',
    'auction': 'XZufAD-u0C4',
    'bidding': '9nte4r_FiGQ',
    'tax': 'uGDr8kkzSfI',
    'sureties': '9nte4r_FiGQ',
    'payout': '0e3JYDJXFzg',
    'finovest': '9nte4r_FiGQ',
    'values': 'QYUnKj8RmnU',
    'enroll': '6v-1Xk1eLaM',
    'security': 'zzz_HabBI3M',
    'online-auction': 'elrf36X5_m4'
  };

  /* ===================== HELPER FUNCTIONS ===================== */
  
  // Function to parse answer text into bullet points
  const parseAnswerToBullets = (answerText) => {
    if (!answerText) return [];
    
    // Split by newlines and filter empty lines
    const lines = answerText.split('\n').filter(line => line.trim());
    
    // Process lines to detect bullet patterns
    const parsedLines = lines.map(line => {
      const trimmedLine = line.trim();
      
      // Check for bullet patterns
      const isBullet = trimmedLine.match(/^[•\-\*]|^\d+\./) || 
                       trimmedLine.match(/^[A-Z][^:]*:/) || 
                       trimmedLine.includes(':');
      
      return {
        text: trimmedLine,
        isBullet: isBullet,
        isHeading: trimmedLine.match(/^[A-Z][^:]*:$/) && !trimmedLine.includes('.')
      };
    });
    
    return parsedLines;
  };

  /* ===================== DATA ===================== */

  const faqItems = [
     {
      id: 1,
      question: "Why should I join Coinplus?",
      answer: `Coinplus brings the trusted tradition of systematic savings plans (SSPs), also known as “chits,” into the digital age. Manage everything from the convenience of your phone, with complete transparency and ease. Coinplus fosters a compulsory savings habit, helping you achieve your financial goals.`,
      videoId: videoData.benefits,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/20 sm:shadow-purple-500/30"
    },
    {
      id: 2,
      question: "What are the benefits of a chit fund?",
      answer: `Savings: Chit funds provide a disciplined savings mechanism where individuals can contribute fixed amounts regularly. This helps in cultivating a habit of saving and building a corpus over time.

Investment and a Borrowing Tool: In chit funds, when you pay the monthly installment, you invest that money and when you win the auction, you borrow against the subsequent installments (future savings).

Access to Funds: Participants in a chit fund have the opportunity to access a lump sum of money through the auction or lottery system. This can be beneficial for those who need funds for various purposes such as emergencies, education, starting a business or making investments.

No Interest Payments: Unlike traditional loans or credit options, the rate of interest is much lower on the funds received.

Flexibility: Chit funds offer flexibility in terms of the amount of contribution and the duration of the scheme. Participants can choose the chit value and the duration that suits their financial goals and requirements.

Risk Distribution: The collective nature of chit funds spreads the risk among the participants. Each member has an equal chance of receiving the chit value, ensuring fairness and equal opportunity for all.

Potential for Returns: Chit funds often provide an opportunity for participants to earn returns beyond their contributions. If participants win the bid for the chit value early in the scheme, they can benefit from the surplus funds contributed by other members. There will be a compulsory saving which will earn dividends every month. Even if you claim in the last month, the total dividends earned will be more than the bank interest rate.

Tax Free Dividends: From the tax point of view, while the overall income is subject to income tax, the dividends earned per month are neither taxable nor tax deductible. Any losses can be claimed as business losses.

Trust and Transparency: Regulated and authorized chit fund companies, like Margadarsi, provide a high level of trust and transparency in the operations. Participants can rely on the professionalism and expertise of the chit fund organizers in managing the scheme effectively.

Social Connection: Chit funds often create a sense of community and social bonding among the participants. Members interact and engage with each other during the meetings and auction process, fostering a sense of camaraderie and support.

Level Playing Field: To some extent, chit funds level the playing field by providing access to money for financially excluded communities.`,
      videoId: videoData.benefits,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/20 sm:shadow-purple-500/30"
    },
   
    {
      id: 3,
      question: "How are Chit funds (SSPs) beneficial?",
      answer: `Chit funds (SSPs) are beneficial because they act as a dual instrument—they help you save consistently until the end of the chit, often yielding better returns than a bank savings account or recurring deposit (RD). They also allow you to borrow. In case of any unforeseen circumstances, you can lend more than what you have saved, providing financial flexibility. Additionally, the dividends received from chits are tax-free, making them a tax-efficient savings and borrowing tool.`,
      videoId: videoData.operation,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/20 sm:shadow-purple-500/30"
    },
    {
      id: 4,
      question: "How does a chit fund operate?",
      answer: `A chit is a mutually beneficial scheme where a group of people contribute towards the chit value. Each month, a member from the group is selected as the prized subscriber, receiving the prize amount.
Dividends are distributed among the remaining members.
The maximum bid allowed is 40% of the chit value.
The company receives a 5% commission, and the rest of the discount amount is distributed equally among the members.
Dividends earned represent the interest on members' installment payments.
Non-Prized Subscribers whose payments are up to date can participate in the auctions.
Successful Bidders must provide required sureties based on future chit liability.
Monthly installments must be paid by the prized subscriber until the termination of the chit.
If there are no bidders, the auction is decided by lot among Non-Prized Subscribers.
The dividend accrued over 50 months is the return on investment for monthly subscriptions made by members.`,
      videoId: videoData.operation,
      icon: <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/20 sm:shadow-blue-500/30"
    },
    {
      id: 5,
      question: "What are the modes of payment on Coinplus?",
      answer: `Coinplus supports multiple payment modes, including:

UPI: Use your preferred UPI app for seamless contributions.
Netbanking: Transfer funds securely from your bank account.
Cheque: Traditional payment method.
Auto-Debit: Set up automatic recurring payments for hassle-free savings.
Cash collection & UPI payment at doorstep: Convenient doorstep services.`,
      videoId: videoData.payment,
      icon: <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-emerald-500 to-green-500",
      glow: "shadow-emerald-500/20 sm:shadow-emerald-500/30"
    },
    {
      id: 6,
      question: "When can I participate in the auction?",
      answer: "A member can participate in the auction starting from the very first auction, provided that their payments are up to date. If payment is made by cheque, it must be cleared before the auction date. A defaulter, whose payments are not up to date before the auction, is not eligible to take part in the auction.",
      videoId: videoData.auction,
      icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-amber-500 to-orange-500",
      glow: "shadow-amber-500/20 sm:shadow-amber-500/30"
    },
    {
      id: 7,
      question: "What is the purpose of bidding?",
      answer: "In each chit group, certain members will require funds. Therefore, all members in need of funds will participate in the auction for bidding. The objective of bidding is to determine the successful bidder who places the highest bid amount (which must not exceed the maximum limit) within the designated auction duration of 5 minutes.",
      videoId: videoData.bidding,
      icon: <Gavel className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-red-500 to-rose-500",
      glow: "shadow-red-500/20 sm:shadow-red-500/30"
    },
    {
      id: 8,
      question: "What are the Income Tax benefits?",
      answer: "The dividends earned in a chit are not subject to taxation. If you intend to declare the bid amount as a loss, then these dividends must be presented as revenue income during the assessment. As a result, the entirety of the dividend earned in a chit is exempt from taxation if you choose not to declare the bid amount as a loss.",
      videoId: videoData.tax,
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-indigo-500 to-violet-500",
      glow: "shadow-indigo-500/20 sm:shadow-indigo-500/30"
    },
    {
      id: 9,
      question: "What are the sureties accepted while availing the prize money?",
      answer: `The following sureties are accepted:

Gold (22 carat & above)
Non-Prized Chit (NPC)
Fixed Deposits (FDs) from Nationalized and scheduled banks
Surrender value of LIC policies
Personal guarantee of salaried professionals
Bonds/Debentures/Deposits of Group Firms
Bank guarantee from scheduled commercial banks
Unencumbered Land & Building`,
      videoId: videoData.security,
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-indigo-500 to-violet-500",
      glow: "shadow-indigo-500/20 sm:shadow-indigo-500/30"
    },
    {
      id: 10,
      question: "What are the sureties to be submitted?",
      answer: `A member can provide sureties based on the future liability of the chit. The following are the sureties typically offered by members:

Personal Surety:Any salaried individual employed in State/Central Government, Public Limited Companies, Banks, and other Reputed Companies will be accepted as a surety.
Bank Guarantee:A guarantee provided by a Scheduled Bank in a specified format can be submitted as surety.
Income Tax Assessor:Any individual with Income Tax assessment records for the previous three years, involving business or a profession, can serve as a surety.
Property Pledge:Depositing title deeds of urban property can be presented as surety. Third-party property can also be used as surety.`,
      videoId: videoData.sureties,
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-sky-500 to-blue-500",
      glow: "shadow-sky-500/20 sm:shadow-sky-500/30"
    },
    {
      id: 11,
      question: "How soon can I expect payment?",
      answer: `Once a member is declared a successful bidder, it becomes their responsibility to provide satisfactory sureties or guarantors based on the future liability as specified in the bylaws. Upon receiving the surety form, the Branch forwards it to the Corporate Office for a Guarantor search. The liabilities of both the member and the guarantors are verified. If the guarantors are deemed acceptable, the form is returned to the Branch for documentation. The Branch is responsible for preparing the required documents, which primarily include the guarantor bond and promissory note, along with other necessary requirements depending on the type of sureties submitted.

Once the documentation and verification processes are complete, the documents are forwarded to the Corporate Office. The Corporate Office meticulously reviews the documents, and if they are found to be satisfactory, payment is released within 2 days.

In the majority of cases, the entire transaction is completed within 10 days, although this timeframe significantly depends on the type of sureties provided and the documents furnished by the member. Members who make regular payments and promptly submit the required documents will have the best chance of receiving expedited payment.`,
      videoId: videoData.payment,
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 12,
      question: "What is a ticket?",
      answer: `A "ticket" means the share of a subscriber in a chit. The foreman always has the first ticket.`,
      videoId: videoData.payout,
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 13,
      question: "What does a share of discount or dividend mean?",
      answer: `In chit funds, dividends represent the portion of profits or returns distributed to members, typically after each auction or on a monthly basis, continuing until the chit cycle concludes.`,
      
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 14,
      question: "What happens if nobody participates in an auction?",
      answer: `If no one participates in an auction, one of the prompt, non-prized subscribers will be selected through a high-tech lottery process, ensuring transparency and fairness.`,
      
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 15,
      question: "Is online auction legal in India?",
      answer: `Yes, online auctions are legal in India as per the Amendment Bill 2019 of Chit Fund Act 1982.`,
    
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 16,
      question: "What are the charges to join an SSP?",
      answer: `The charges to join an SSP are 0.1% of the chit value, subject to a minimum of ₹200 and a maximum of ₹500. This is a one-time membership fee, and you can join as many groups as you wish.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 17,
      question: "Can NRIs join in chit groups?",
      answer: `Yes, NRIs can join chit groups. NRIs need to provide a valid passport and visa, while`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 18,
      question: " Can Business entities join in chit groups?",
      answer: `Yes, GST registered business entities can join chit groups.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 19,
      question: "Can a single person join multiple chit groups?",
      answer: `Yes, you can join multiple groups. However, you will need to furnish sufficient securities while releasing the prized amount.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 20,
      question: "What does a bid mean in the chit-fund process?",
      answer: `Bidding is nothing but a discount, which is a quantum of the amount that a subscriber forgoes in a draw in order to get the prize amount. The subscribers forego the highest discount during the prescribed time limit within the ceiling fixed by the Chit Funds Act, 1982, i.e. 40%.`,
    
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 21,
      question: "What happens if nobody bids in the auction?",
      answer: `In the event that no bidder is forthcoming in an auction, a lot will be drawn from the non-prized subscribers at the close of the prescribed time (i.e. 5 minutes), and the subscriber drawn will be declared as a prized subscriber. He will be entitled to receive the gross chit amount for his ticket less the foreman commission.`,
      
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 22,
      question: "Who is a Prized Subscriber?",
      answer: `A Prized Subscriber means a subscriber who has either received or is entitled to receive the net chit amount. The prized subscriber who draws the net chit amount shall pay the Foreman the amount due for his ticket for each instalment on or before the due date of each such auction.

The prized subscriber who is entitled to receive the net chit amount must furnish necessary security or sureties to the satisfaction of the foreman for due payment of future subscriptions to draw the net chit amount.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 23,
      question: "What does an auction mean in the chit-fund process?",
      answer: `In a Chit Fund Organisation, auctions play a vital role, which is crucial for identifying the prized subscriber in each auction. The subscriber who is to get the prize amount at any instalment shall be determined by a lot or by an auction at the place and time mentioned in the chit agreement. The time allowed for the auction is 5 minutes from the commencement of the proceedings. The proceedings will be regulated by the foreman, and in case of a dispute, the decision of the foreman is final.

The prime eligibility for subscribers to participate in an auction is to make up-to-date payments. The subscribers can submit written bid offers stating the maximum amount of discount they are willing to forego, which must be received by the foreman at least one day before the concerned auction, and it can be withdrawn only 24 hours before the auction time. Only subscribers or their authorised persons/proxies will be allowed to take part in the auction. Such authorisations shall be in writing.

The auction shall start from a foreman’s commission of 5% of the chit value, and bidders may, in the auction, raise a discount to the maximum of 25/30/35/40 per cent of the chit value, which is mentioned in the chit agreement. Each time, the bid shall be raised by rupees hundred or multiples thereof.

The non-prized subscriber who bids at the highest discount, not exceeding the specified maximum discount, will be declared as the prized subscriber. If there is more than one bidder for the maximum discount, the auction will be decided by lot among such bidders.`,
      
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 24,
      question: "Who is a foreman?",
      answer: `Among various rights and duties of the foreman, the following are crucial for the proper conducting of the chit.

It is the Right of the Foreman-

To obtain the gross chit amount without deducing the discount at the instalment specified in the chit agreement.
To entitle 5% of gross chit amount as may be fixed in the chit agreement by way of commission or remuneration for meeting the expenses for running the chit.
To collect interest and penalty, if any, payable on any default in the payment instalments under the provisions of the chit agreement.
To receive and realise all subscriptions from the subscribers and to distribute the prize amounts to the prized subscribers.
To demand sufficient security from any prized subscriber for the due payment of future subscriptions payable by him.
It is the duty of foreman-

To be bound to pay the net chit amount to the prized subscriber on furnishing sufficient security for the due payment of future subscriptions.
To deposit the unpaid net chit amount in a separate account in an approved bank mentioned in the chit agreement where the prized subscriber is unable to draw the net chit amount until the next succeeding auction. To intimate in writing the fact of such deposit and the reasons to the prized subscriber as well as the registrar.
To distribute a share of discount or dividend among the subscribers by way of adjustment towards the subscriptions payable for the next instalment, in accordance with the chit agreement.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 25,
      question: "What are the rights and duties of the foreman?",
      answer: `In a Chit Fund Organisation, auctions play a vital role, which is crucial for identifying the prized subscriber in each auction. The subscriber who is to get the prize amount at any instalment shall be determined by a lot or by an auction at the place and time mentioned in the chit agreement. The time allowed for the auction is 5 minutes from the commencement of the proceedings. The proceedings will be regulated by the foreman, and in case of a dispute, the decision of the foreman is final.

The prime eligibility for subscribers to participate in an auction is to make up-to-date payments. The subscribers can submit written bid offers stating the maximum amount of discount they are willing to forego, which must be received by the foreman at least one day before the concerned auction, and it can be withdrawn only 24 hours before the auction time. Only subscribers or their authorised persons/proxies will be allowed to take part in the auction. Such authorisations shall be in writing.

The auction shall start from a foreman’s commission of 5% of the chit value, and bidders may, in the auction, raise a discount to the maximum of 25/30/35/40 per cent of the chit value, which is mentioned in the chit agreement. Each time, the bid shall be raised by rupees hundred or multiples thereof.

The non-prized subscriber who bids at the highest discount, not exceeding the specified maximum discount, will be declared as the prized subscriber. If there is more than one bidder for the maximum discount, the auction will be decided by lot among such bidders.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-teal-500 to-emerald-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    
  ];

  const FinovestItems = [
    {
      id: 'm1',
      question: "Why choose Finovest?",
      answer: "Finovest is a trusted chit fund company with transparency, compliance, and timely payouts.",
      videoId: videoData.finovest,
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-fuchsia-500 to-purple-500",
      glow: "shadow-fuchsia-500/20 sm:shadow-fuchsia-500/30"
    },
    {
      id: 'm2',
      question: "What chit values are available?",
      answer: "Chit values range from ₹50,000 to ₹1,00,00,000.",
      videoId: videoData.values,
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/20 sm:shadow-orange-500/30"
    },
    {
      id: 'm3',
      question: "What are the durations?",
      answer: "Durations range from 10 to 60 months based on scheme and value.",
      icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-cyan-500 to-blue-500",
      glow: "shadow-cyan-500/20 sm:shadow-cyan-500/30"
    },
    {
      id: 'm4',
      question: "How to enroll?",
      answer: "Enroll via branch visit, online registration, or home assistance.",
      videoId: videoData.enroll,
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-lime-500 to-green-500",
      glow: "shadow-lime-500/20 sm:shadow-lime-500/30"
    },
    {
      id: 'm5',
      question: "How secure is my money?",
      answer: "Registered under the Chit Funds Act with full regulatory compliance.",
      videoId: videoData.security,
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-amber-500 to-yellow-500",
      glow: "shadow-amber-500/20 sm:shadow-amber-500/30"
    }
  ];

  const supportItems = [
    {
      id: 's1',
      question: "Bid Offer in Advance",
      answer: "Subscribers can place advance bids for future auctions.",
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-violet-500 to-purple-500",
      glow: "shadow-violet-500/20 sm:shadow-violet-500/30"
    },
    {
      id: 's2',
      question: "Online Auction Participation",
      answer: "Participate securely via mobile app or web portal.",
      videoId: videoData['online-auction'],
      icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-rose-500 to-pink-500",
      glow: "shadow-rose-500/20 sm:shadow-rose-500/30"
    },
    {
      id: 's3',
      question: "Customer Support",
      answer: "Support via helpline, WhatsApp, email, and branches.",
      icon: <HeadphonesIcon className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-blue-500 to-indigo-500",
      glow: "shadow-blue-500/20 sm:shadow-blue-500/30"
    }
  ];

  /* ===================== RESPONSIVE LOGIC ===================== */

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  // Fetch YouTube videos
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      if (!YOUTUBE_API_KEY) {
        setVideos([
          { id: { videoId: 'xXQdXQdXQdQ' }, snippet: { title: 'Understanding Chit Funds' } },
          { id: { videoId: 'yYQdYQdYQdY' }, snippet: { title: 'How to Invest in Chit Funds' } },
        ]);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=5&type=video`
        );
        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        setVideos([
          { id: { videoId: 'xXQdXQdXQdQ' }, snippet: { title: 'Understanding Chit Funds' } },
          { id: { videoId: 'yYQdYQdYQdY' }, snippet: { title: 'How to Invest in Chit Funds' } },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, [YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking on a section
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  /* ===================== RENDER FUNCTION WITH BULLETS ===================== */

  const renderItem = (item) => {
    const hasVideo = item.videoId;
    const isActive = activeItem === item.id;
    const isHovered = hoveredItem === item.id;
    const parsedAnswer = parseAnswerToBullets(item.answer);

    return (
      <div 
        key={item.id} 
        className={`
          relative mb-2 sm:mb-2 group cursor-pointer
          transform transition-all duration-300 
          active:scale-[0.99] sm:hover:scale-[1.01] ${isActive ? 'scale-[1.01]' : ''}
        `}
        onMouseEnter={() => !window.matchMedia('(max-width: 640px)').matches && setHoveredItem(item.id)}
        onMouseLeave={() => !window.matchMedia('(max-width: 640px)').matches && setHoveredItem(null)}
      >
        {/* Animated Background Glow - Reduced on mobile */}
        <div className={`
          absolute inset-0 rounded-xl sm:rounded-2xl blur-lg opacity-10 sm:opacity-20 
          sm:group-hover:opacity-40 transition-all duration-300 ${item.glow}
          ${isActive ? 'opacity-20 sm:opacity-40' : ''}
        `} />
        
        {/* Main Card - Mobile optimized padding */}
        <div className={`
          relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 sm:border-white/20
          backdrop-blur-sm bg-gradient-to-br from-white/90 via-white/80 to-white/70
          sm:from-white/80 sm:via-white/60 sm:to-white/40
          shadow-md sm:shadow-lg shadow-black/5
          ${isActive ? 'ring-1 sm:ring-2 ring-white/30 sm:ring-white/50' : ''}
        `}>
          {/* Animated Gradient Border - Simplified on mobile */}
          <div className={`
            absolute inset-0 rounded-xl sm:rounded-2xl p-[1px] sm:p-[2px] bg-gradient-to-r ${item.gradient} opacity-0
            sm:group-hover:opacity-100 transition-opacity duration-300
            ${isActive ? 'opacity-100' : ''}
          `}>
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/90 sm:bg-white/80 backdrop-blur-sm" />
          </div>
          
          {/* Content - Mobile optimized layout */}
          <div className="relative z-10">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full p-2 sm:p-4 flex justify-between items-center text-left"
            >
              <div className="flex gap-3 sm:gap-4 items-center flex-1 min-w-0">
                {/* Icon with Gradient Background - Responsive sizing */}
                <div className={`
                  relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.gradient} 
                  shadow-md sm:shadow-lg ${item.glow} flex-shrink-0
                  transform transition-transform duration-300
                  active:scale-95 sm:group-hover:scale-110 ${isActive ? 'scale-95 sm:scale-110' : ''}
                `}>
                  <div className="relative text-white">
                    {item.icon}
                  </div>
                  {/* Floating particles effect - Hidden on mobile */}
                  {isHovered && !window.matchMedia('(max-width: 640px)').matches && (
                    <>
                      <div className="absolute -top-1 -right-1 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-ping" />
                      <div className="absolute -bottom-1 -left-1 w-1 h-1 sm:w-2 sm:h-2 bg-white/50 rounded-full animate-ping" />
                    </>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-xs sm:text-sm md:text-md text-gray-800 group-hover:text-gray-900 block truncate sm:whitespace-normal">
                    {item.question}
                  </span>
                  {hasVideo && (
                    <div className="flex items-center gap-1 sm:gap-2 mt-1">
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full flex items-center gap-1 shadow-sm sm:shadow-lg shadow-red-500/20 sm:shadow-red-500/30 flex-shrink-0">
                        <Youtube className="w-2 h-2 sm:w-3 sm:h-3" /> 
                        <span className="hidden xs:inline">Video</span>
                      </span>
                      <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-500 animate-pulse flex-shrink-0" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Animated Chevron - Responsive sizing */}
              <div className={`
                p-1 sm:p-2 rounded-full bg-gradient-to-br from-white to-gray-100 ml-2 flex-shrink-0
                shadow-sm sm:shadow-lg transform transition-all duration-300
                ${isActive ? 'rotate-180' : ''}
              `}>
                {isActive ? 
                  <ChevronUp className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" /> : 
                  <ChevronDown className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                }
              </div>
            </button>

            {/* Expanded Content - Responsive padding */}
            {isActive && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-fadeIn">
                {/* Answer with bullet formatting */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm">
                  <div className="space-y-3 sm:space-y-4">
                    {parsedAnswer.map((line, index) => {
                      // Check if this is a heading line
                      if (line.isHeading) {
                        return (
                          <div key={index} className="mb-2">
                            <h4 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                              {line.text}
                            </h4>
                          </div>
                        );
                      }
                      
                      // Check if this is a bullet point
                      if (line.isBullet) {
                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                                {line.text}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      
                      // Regular text (no bullet)
                      return (
                        <div key={index} className="ml-5">
                          <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                            {line.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Video Section */}
                {hasVideo && (
                  <div className="space-y-4 sm:space-y-6">
                    {/* Video Header - Responsive layout */}
                    <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-50/50 to-pink-50/50 backdrop-blur-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg shadow-sm sm:shadow-lg flex-shrink-0">
                            <Youtube className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm sm:text-base">Video Tutorial</h4>
                            <p className="text-gray-600 text-xs sm:text-sm">Watch and learn visually</p>
                          </div>
                        </div>
                        <a
                          href={`https://www.youtube.com/watch?v=${item.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/20 sm:hover:shadow-red-500/30 transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="font-semibold">Watch</span>
                        </a>
                      </div>
                    </div>
                    
                    {/* Video Player - Responsive aspect ratio */}
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl shadow-black/10 sm:shadow-black/20">
                      <div className="aspect-video">
                        <YouTubePlayer 
                          videoId={item.videoId} 
                          title={`Video: ${item.question}`}
                          responsive={true}
                        />
                      </div>
                    </div>
                    
                    {/* Action Buttons - Responsive grid */}
                    <div className="flex">
                      <a
                        href={`https://www.youtube.com/watch?v=${item.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-red-700 p-3 sm:p-4 text-white shadow-md hover:shadow-lg hover:shadow-red-500/20 sm:hover:shadow-red-500/30 transition-all duration-300 active:scale-95 sm:hover:scale-[1.02] w-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                          <Youtube className="w-4 h-4 sm:w-6 sm:h-6" />
                          <span className="font-bold text-sm sm:text-base">Watch on YouTube</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ===================== RESPONSIVE UI ===================== */

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements - Responsive positioning */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/5 rounded-full blur-xl sm:blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/5 rounded-full blur-xl sm:blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-pink-500/5 rounded-full blur-xl sm:blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative max-w-4xl lg:max-w-6xl mx-auto">
        {/* Header Section - Responsive typography */}
      

        {/* Main Content */}
        <div className="relative">
          {/* Glass Morphism Container - Responsive border radius */}
          <div className="backdrop-blur-lg sm:backdrop-blur-xl bg-white/80 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg sm:shadow-2xl shadow-black/5 sm:shadow-black/10 overflow-hidden">
            {/* Sticky Navigation - Responsive layout */}
            <div className="sticky top-0 z-50">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-lg sm:backdrop-blur-xl border-b border-gray-200">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-md sm:text-lg md:text-xl text-gray-800 truncate">
                        Interactive FAQ Explorer
                      </h2>
                      <p className="text-xs sm:text-sm font-normal text-gray-600 mt-1 truncate">
                        <Sparkles className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500" />
                        {activeSection === 'about-chit-fund' && 'Explore Chit Fund Fundamentals'}
                        {activeSection === 'about-Finovest' && 'Discover Finovest Excellence'}
                        {activeSection === 'support' && 'Get Expert Support & Tools'}
                      </p>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-2 ml-4">
                      {['about-chit-fund', 'about-Finovest', 'support'].map((section) => (
                        <button
                          key={section}
                          onClick={() => {
                            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`
                            px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap
                            ${activeSection === section 
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }
                          `}
                        >
                          {section.split('-')[1]}
                        </button>
                      ))}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="md:hidden ml-3 p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                    >
                      {isMobileMenuOpen ? <X className="w-5 h-5 text-blue-700" /> : <Menu className="w-5 h-5 text-blue-700" />}
                    </button>
                  </div>
                </div>
                
                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                  <div className="md:hidden bg-white border-t border-gray-200 px-2 py-3 animate-slideDown">
                    <div className="flex flex-col gap-2">
                      {['about-chit-fund', 'about-Finovest', 'support'].map((section) => (
                        <button
                          key={section}
                          onClick={() => {
                            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                            setIsMobileMenuOpen(false);
                          }}
                          className={`
                            px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-left
                            ${activeSection === section 
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }
                          `}
                        >
                          {section === 'about-chit-fund' && '📊 Chit Funds'}
                          {section === 'about-Finovest' && '🏆 Finovest'}
                          {section === 'support' && '🛠️ Support'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content - Responsive padding */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Chit Fund Section */}
              <section 
                id="about-chit-fund" 
                ref={el => sectionRefs.current['about-chit-fund'] = el} 
                className="mb-12 sm:mb-16 scroll-mt-20 sm:scroll-mt-24"
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl blur opacity-10 sm:opacity-20" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl flex-shrink-0">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm  md:text-md font-bold text-gray-800 truncate">Master Chit Funds</h3>
                        <p className="text-gray-600 text-xs sm:text-sm truncate">Learn everything about chit funds</p>
                      </div>
                    </div>
                  </div>
                </div>
                {faqItems.map(renderItem)}
              </section>

              {/* Finovest Section */}
              <section 
                id="about-Finovest" 
                ref={el => sectionRefs.current['about-Finovest'] = el} 
                className="mb-12 sm:mb-16 scroll-mt-20 sm:scroll-mt-24"
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl blur opacity-10 sm:opacity-20" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-purple-100">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl flex-shrink-0">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-md sm:text-lg md:text-xl font-bold text-gray-800 truncate">Why Finovest?</h3>
                        <p className="text-gray-600 text-sm sm:text-md truncate">Discover the excellence</p>
                      </div>
                    </div>
                  </div>
                </div>
                {FinovestItems.map(renderItem)}
              </section>

              {/* Support Section */}
              <section 
                id="support" 
                ref={el => sectionRefs.current['support'] = el} 
                className="mb-12 sm:mb-16 scroll-mt-20 sm:scroll-mt-24"
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl blur opacity-10 sm:opacity-20" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl flex-shrink-0">
                        <HeadphonesIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800 truncate">Support & Resources</h3>
                        <p className="text-gray-600 text-sm sm:text-base truncate">Get the help you need</p>
                      </div>
                    </div>
                  </div>
                </div>
                {supportItems.map(renderItem)}
              </section>

              {/* YouTube Channel Section - Responsive layout */}
              <div className="relative mt-12 sm:mt-16 md:mt-20">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border border-red-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5" />
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .text-balance {
            text-wrap: balance;
          }
        }
      `}</style>
    </div>
  );
};

export default ChitFundFAQ;