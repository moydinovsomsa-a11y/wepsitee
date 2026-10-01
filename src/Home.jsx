import React, { useState } from 'react';
import { 
  Mic, MicOff, RefreshCw,
  Home as HomeIcon, PieChart, Receipt, CreditCard, PiggyBank, Utensils, 
  Briefcase, User, Plus, Trash2, ArrowUpRight, ArrowDownLeft, 
  Search, ShieldCheck, AlertCircle, CheckCircle2,
  Sparkles, MapPin, DollarSign, Maximize2, Minimize2, Edit3,
  X, TrendingUp, Crown, Map, Settings,
  CheckCircle, Navigation
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2026-09-26 14:20', desc: 'Korzinka Supermarket', cat: 'Oziq-ovqat', source: 'Humo Card', amount: -120000, type: 'card' },
  { id: 2, date: '2026-09-26 10:15', desc: 'Yandex Go Taksi', cat: 'Transport', source: 'Humo Card', amount: -25000, type: 'card' },
  { id: 3, date: '2026-09-25 18:30', desc: 'Oylik Maosh Tushumi', cat: 'Daromad', source: 'Humo Card', amount: 3500000, type: 'card' },
  { id: 4, date: '2026-09-24 12:00', desc: 'Tushlik (Osh markazi)', cat: 'Oziq-ovqat', source: 'Naqd Pul', amount: -35000, type: 'cash' },
  { id: 5, date: '2026-09-23 16:45', desc: 'Paynet Mobil Aloqa', cat: 'Aloqa', source: 'Uzcard', amount: -50000, type: 'card' }
];

const INITIAL_GOALS = [
  { id: 1, name: 'Yangi MacBook Pro M3', target: 20000000, saved: 13000000, category: 'Texnika' },
  { id: 2, name: 'Sayohat (Dubay)', target: 10000000, saved: 3200000, category: 'Sayohat' },
  { id: 3, name: 'Favqulodda Fond (Emergency)', target: 5000000, saved: 4500000, category: 'Xavfsizlik' }
];

const INITIAL_RESTAURANTS = [
  { id: 1, name: '"Osh Markazi" Chilonzor', cat: 'Milliy taomlar', avgPrice: 30000, tag: 'Sifatli', rating: 4.8, desc: 'Osh, Shashlik va Somsa setlari. Talabalar uchun 10% chegirma.', badge: 'Ommabop', dist: '0.8 km', address: 'Chilonzor Qatortol 12, Toshkent', lat: 41.282, lng: 69.215 },
  { id: 2, name: 'Evos Fast Food', cat: 'Fast Food', avgPrice: 28000, tag: 'Arzon', rating: 4.5, desc: 'Lavash, Burger va Kombi menyular. Tez yetkazib berish.', badge: 'Kombi Set', dist: '1.2 km', address: 'Amir Temur ko\'chasi 45, Toshkent', lat: 41.311, lng: 69.279 },
  { id: 3, name: '"Sulton" Milliy Taomlar', cat: 'Milliy taomlar', avgPrice: 22000, tag: 'Arzon', rating: 4.6, desc: 'Lag\'mon va Sho\'rva. Har kuni 12:00 dan 14:00 gacha aksiya.', badge: 'Arzon', dist: '0.5 km', address: 'Yakkasaroy tumani 18, Toshkent', lat: 41.295, lng: 69.255 },
  { id: 4, name: 'Safia Bakery & Cafe', cat: 'Kafeteriya', avgPrice: 65000, tag: 'Qimmat', rating: 4.9, desc: 'Kofe, shirinliklar va ertalabki premium nonushta to\'plamlari.', badge: 'Premium', dist: '2.1 km', address: 'Mirabad ko\'chasi 8, Toshkent', lat: 41.300, lng: 69.271 }
];

const INITIAL_JOBS = [
  { id: 1, title: 'Senior React & Node Dasturchi', company: 'TechStart LLC', salary: 18000000, isHighPay: true, isVip: true, type: 'To\'liq stavka', tags: ['React', 'Node.js', 'TypeScript'], loc: 'Toshkent', address: 'IT Park, Yunusobod 4, Toshkent', lat: 41.365, lng: 69.288 },
  { id: 2, title: 'SMM & Kontent Menejer', company: 'Digital Agency UZ', salary: 5500000, isHighPay: false, isVip: false, type: 'Yarim stavka', tags: ['Instagram', 'CapCut', 'SMM'], loc: 'Samarqand / Remote', address: 'Registon ko\'chasi 14, Samarqand', lat: 39.654, lng: 66.975 },
  { id: 3, title: 'Lead UI/UX Dizayner', company: 'FinTech Studio', salary: 15000000, isHighPay: true, isVip: false, type: 'To\'liq stavka', tags: ['Figma', 'Prototyping', 'Design System'], loc: 'Toshkent', address: 'Oybek metrosi, Toshkent', lat: 41.298, lng: 69.280 },
  { id: 4, title: 'Bosh Moliyaviy Konsultant', company: 'Capital Advisory', salary: 22000000, isHighPay: true, isVip: true, type: 'To\'liq stavka', tags: ['Excel', 'Finans', 'Audit'], loc: 'Toshkent', address: 'Tashkent City Block 5, Toshkent', lat: 41.312, lng: 69.245 },
  { id: 5, title: 'Junior Python Backend', company: 'DataSoft', salary: 6000000, isHighPay: false, isVip: false, type: 'Masofaviy', tags: ['Python', 'Django', 'SQL'], loc: 'Masofaviy', address: 'Remote / Online', lat: 41.305, lng: 69.260 }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pageMode, setPageMode] = useState('app'); // 'app' (asosiy ilova) | 'admin' (alohida admin sahifa)
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [isPremium, setIsPremium] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState('payme');

  const [cardBalance, setCardBalance] = useState(4850000);
  const [cashBalance, setCashBalance] = useState(650000);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [goals, setGoals] = useState(INITIAL_GOALS);

  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  
  const [toast, setToast] = useState(null);

  const [isCardLinked, setIsCardLinked] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    type: 'Humo',
    number: '9860 1234 5678 4321',
    exp: '12/28',
    holder: 'SARDOR ALIMOV'
  });

  const [userProfile, setUserProfile] = useState({
    name: 'Sardor Alimov',
    phone: '+998 90 123 45 67',
    email: 'sardor.alimov@startapp.uz',
    status: 'PRO Premial A\'zo',
    faceId: true,
    currency: 'UZS (So\'m)'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...userProfile });

  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [simulatedInput, setSimulatedInput] = useState('');

  const [txSearch, setTxSearch] = useState('');
  const [txFilter, setTxFilter] = useState('all');
  
  const [jobSearch, setJobSearch] = useState('');
  const [onlyHighPayJobs, setOnlyHighPayJobs] = useState(false);
  const [selectedMapJob, setSelectedMapJob] = useState(null);

  const [restSearch, setRestSearch] = useState('');
  const [restPriceFilter, setRestPriceFilter] = useState('all');
  const [selectedMapRest, setSelectedMapRest] = useState(null);

  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);
  const [isAddCashOpen, setIsAddCashOpen] = useState(false);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [newCashAmt, setNewCashAmt] = useState('');

  const [isAdminJobModalOpen, setIsAdminJobModalOpen] = useState(false);
  const [isAdminRestModalOpen, setIsAdminRestModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editingRest, setEditingRest] = useState(null);

  const [jobForm, setJobForm] = useState({
    title: '', company: '', salary: '', type: 'To\'liq stavka', 
    tags: '', loc: '', address: '', lat: '41.311', lng: '69.279', isHighPay: false, isVip: false
  });

  const [restForm, setRestForm] = useState({
    name: '', cat: 'Milliy taomlar', avgPrice: '', tag: 'Arzon', 
    rating: '4.5', desc: '', badge: 'Tavsiya', dist: '1.0 km', 
    address: '', lat: '41.311', lng: '69.279'
  });

  const [manualTx, setManualTx] = useState({
    desc: '',
    amount: '',
    category: 'Oziq-ovqat',
    source: 'Humo Card'
  });

  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    category: 'Texnika'
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Haqiqiy brauzer to'liq ekran rejimi (F11 kabi)
  const toggleBrowserFullscreen = () => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      showToast("Brauzer to'liq ekran rejimini qo'llab-quvvatlamadi.", "error");
    }
  };

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getExpenseStatus = () => {
    if (totalExpenses <= 1500000) {
      return { label: 'Normal / Yaxshi (Tejamkor)', color: 'text-emerald-600', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    }
    if (totalExpenses < 5000000) {
      return { label: 'O\'rtacha (Me\'yorida)', color: 'text-amber-600', bg: 'bg-amber-500/10 border-amber-500/30' };
    }
    return { label: 'Yuqori Xavf (Ko\'p xarajat)', color: 'text-rose-600', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  const processVoiceCommand = (text) => {
    if (!text.trim()) return;
    const numbers = text.match(/\d+/g);
    let amount = numbers ? parseInt(numbers.join(''), 10) : 15000;

    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      desc: text.length > 35 ? text.substring(0, 35) + '...' : text,
      cat: 'Ovozli Kiritish',
      source: isCardLinked ? 'Humo Card' : 'Naqd Pul',
      amount: -Math.abs(amount),
      type: isCardLinked ? 'card' : 'cash'
    };

    setTransactions(prev => [newTx, ...prev]);
    if (isCardLinked) {
      setCardBalance(prev => prev - Math.abs(amount));
    } else {
      setCashBalance(prev => prev - Math.abs(amount));
    }
    showToast(`Ovozli xarajat qo'shildi: ${Math.abs(amount).toLocaleString()} UZS`, 'success');
    setVoiceText('');
    setSimulatedInput('');
  };

  const handleSimulatedVoiceSubmit = (e) => {
    e.preventDefault();
    processVoiceCommand(simulatedInput);
  };

  const toggleVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast("Brauzeringiz nutqni tanib olishni qo'llab-quvvatlamaydi. Matnli simulyatsiyadan foydalaning.", "error");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ';

    if (!isListening) {
      recognition.start();
      setIsListening(true);
      setVoiceText('Tinglanmoqda...');

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceText(`"${transcript}"`);
        processVoiceCommand(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        showToast("Ovozni tanib olishda xatolik yuz berdi.", "error");
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsListening(false);
    }
  };

  const handleAddManualTx = (e) => {
    e.preventDefault();
    if (!manualTx.desc || !manualTx.amount) return;

    const amt = parseFloat(manualTx.amount);
    const isExpense = amt > 0;
    const finalAmt = isExpense ? -amt : amt;

    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      desc: manualTx.desc,
      cat: manualTx.category,
      source: manualTx.source,
      amount: finalAmt,
      type: manualTx.source.includes('Naqd') ? 'cash' : 'card'
    };

    if (manualTx.source.includes('Naqd')) {
      setCashBalance(prev => prev + finalAmt);
    } else {
      setCardBalance(prev => prev + finalAmt);
    }

    setTransactions(prev => [newTx, ...prev]);
    setIsAddTxModalOpen(false);
    setManualTx({ desc: '', amount: '', category: 'Oziq-ovqat', source: 'Humo Card' });
    showToast("Yangi xarajat muvaffaqiyatli qo'shildi!", "success");
  };

  const handleDeleteTx = (id) => {
    const target = transactions.find(t => t.id === id);
    if (target) {
      if (target.source.includes('Naqd')) {
        setCashBalance(prev => prev - target.amount);
      } else {
        setCardBalance(prev => prev - target.amount);
      }
      setTransactions(prev => prev.filter(t => t.id !== id));
      showToast("Tranzaksiya o'chirildi va balans qaytarildi", "info");
    }
  };

  const handleAddCash = (e) => {
    e.preventDefault();
    const val = parseInt(newCashAmt, 10);
    if (!isNaN(val) && val > 0) {
      setCashBalance(prev => prev + val);
      setIsAddCashOpen(false);
      setNewCashAmt('');
      showToast(`${val.toLocaleString()} UZS naqd pul balansga qo'shildi!`, "success");
    }
  };

  const depositGoal = (goalId, amount) => {
    if (cardBalance < amount) {
      showToast("Kartada yetarli mablag' mavjud emas!", "error");
      return;
    }
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        return { ...g, saved: Math.min(g.target, g.saved + amount) };
      }
      return g;
    }));
    setCardBalance(prev => prev - amount);

    const goalTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      desc: `Jamg'arma to'lovi`,
      cat: 'Jamg\'arma',
      source: 'Humo Card',
      amount: -amount,
      type: 'card'
    };
    setTransactions(prev => [goalTx, ...prev]);
    showToast(`${amount.toLocaleString()} UZS jamg'armaga o'tkazildi!`, "success");
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;
    const targetVal = parseFloat(newGoal.target);
    const createdGoal = {
      id: Date.now(),
      name: newGoal.name,
      target: targetVal,
      saved: 0,
      category: newGoal.category
    };
    setGoals(prev => [...prev, createdGoal]);
    setIsAddGoalModalOpen(false);
    setNewGoal({ name: '', target: '', category: 'Texnika' });
    showToast("Yangi jamg'arma maqsadi yaratildi!", "success");
  };

  const handleOrderFood = (restName, price) => {
    const finalPrice = isPremium ? Math.round(price * 0.9) : price;
    if (cardBalance < finalPrice) {
      showToast("Kartada mablag' yetarli emas!", "error");
      return;
    }
    setCardBalance(prev => prev - finalPrice);
    const foodTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      desc: `Buyurtma: ${restName}`,
      cat: 'Oziq-ovqat',
      source: 'Humo Card',
      amount: -finalPrice,
      type: 'card'
    };
    setTransactions(prev => [foodTx, ...prev]);
    showToast(`${restName} dan ${finalPrice.toLocaleString()} UZS lik buyurtma rasmiylashtirildi! ${isPremium ? '(Premium -10% chegirma!)' : ''}`, "success");
  };

  const handleApplyJob = (job) => {
    if (job.isVip && !isPremium) {
      showToast("Ushbu VIP vakansiyaga faqat Premium obunachilar topshira oladi!", "error");
      setIsPremiumModalOpen(true);
      return;
    }
    showToast(`"${job.title}" vakansiyasiga rezyume muvaffaqiyatli yuborildi!`, "success");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile({ ...profileForm });
    setIsEditingProfile(false);
    showToast("Profil ma'lumotlari yangilandi!", "success");
  };

  const handleSubscribePremium = () => {
    if (cardBalance < 49000) {
      showToast("Obuna uchun kartangizda yetarli mablag' mavjud emas (49,000 UZS)", "error");
      return;
    }
    setCardBalance(prev => prev - 49000);
    setIsPremium(true);
    setIsPremiumModalOpen(false);
    
    const subTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      desc: 'StartApp Premium VIP Obuna',
      cat: 'Xizmatlar',
      source: 'Humo Card',
      amount: -49000,
      type: 'card'
    };
    setTransactions(prev => [subTx, ...prev]);
    showToast("Tabriklaymiz! StartApp Premium VIP faollashtirildi!", "success");
  };

  const handleSaveAdminJob = (e) => {
    e.preventDefault();
    const tagArray = jobForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    const salaryNum = parseFloat(jobForm.salary) || 0;

    if (editingJob) {
      setJobs(prev => prev.map(j => j.id === editingJob.id ? {
        ...j,
        title: jobForm.title,
        company: jobForm.company,
        salary: salaryNum,
        type: jobForm.type,
        tags: tagArray.length ? tagArray : ['Ish'],
        loc: jobForm.loc,
        address: jobForm.address,
        lat: parseFloat(jobForm.lat) || 41.311,
        lng: parseFloat(jobForm.lng) || 69.279,
        isHighPay: jobForm.isHighPay,
        isVip: jobForm.isVip
      } : j));
      showToast("Vakansiya ma'lumotlari yangilandi!", "success");
    } else {
      const newJ = {
        id: Date.now(),
        title: jobForm.title,
        company: jobForm.company,
        salary: salaryNum,
        type: jobForm.type,
        tags: tagArray.length ? tagArray : ['Ish'],
        loc: jobForm.loc,
        address: jobForm.address,
        lat: parseFloat(jobForm.lat) || 41.311,
        lng: parseFloat(jobForm.lng) || 69.279,
        isHighPay: jobForm.isHighPay,
        isVip: jobForm.isVip
      };
      setJobs(prev => [newJ, ...prev]);
      showToast("Yangi vakansiya muvaffaqiyatli qo'shildi!", "success");
    }
    setIsAdminJobModalOpen(false);
    setEditingJob(null);
  };

  const handleDeleteAdminJob = (id) => {
    setJobs(prev => prev.filter(j => j.id !== id));
    showToast("Vakansiya o'chirib tashlandi", "info");
  };

  const openEditJobModal = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      company: job.company,
      salary: job.salary,
      type: job.type,
      tags: job.tags.join(', '),
      loc: job.loc,
      address: job.address,
      lat: String(job.lat),
      lng: String(job.lng),
      isHighPay: job.isHighPay,
      isVip: job.isVip
    });
    setIsAdminJobModalOpen(true);
  };

  const handleSaveAdminRest = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(restForm.avgPrice) || 0;
    const ratingNum = parseFloat(restForm.rating) || 4.5;

    if (editingRest) {
      setRestaurants(prev => prev.map(r => r.id === editingRest.id ? {
        ...r,
        name: restForm.name,
        cat: restForm.cat,
        avgPrice: priceNum,
        tag: restForm.tag,
        rating: ratingNum,
        desc: restForm.desc,
        badge: restForm.badge,
        dist: restForm.dist,
        address: restForm.address,
        lat: parseFloat(restForm.lat) || 41.311,
        lng: parseFloat(restForm.lng) || 69.279
      } : r));
      showToast("Restoran ma'lumotlari yangilandi!", "success");
    } else {
      const newR = {
        id: Date.now(),
        name: restForm.name,
        cat: restForm.cat,
        avgPrice: priceNum,
        tag: restForm.tag,
        rating: ratingNum,
        desc: restForm.desc,
        badge: restForm.badge,
        dist: restForm.dist,
        address: restForm.address,
        lat: parseFloat(restForm.lat) || 41.311,
        lng: parseFloat(restForm.lng) || 69.279
      };
      setRestaurants(prev => [newR, ...prev]);
      showToast("Yangi restoran muvaffaqiyatli qo'shildi!", "success");
    }
    setIsAdminRestModalOpen(false);
    setEditingRest(null);
  };

  const handleDeleteAdminRest = (id) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
    showToast("Restoran ro'yxatdan o'chirildi", "info");
  };

  const openEditRestModal = (rest) => {
    setEditingRest(rest);
    setRestForm({
      name: rest.name,
      cat: rest.cat,
      avgPrice: rest.avgPrice,
      tag: rest.tag,
      rating: rest.rating,
      desc: rest.desc,
      badge: rest.badge,
      dist: rest.dist,
      address: rest.address,
      lat: String(rest.lat),
      lng: String(rest.lng)
    });
    setIsAdminRestModalOpen(true);
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.desc.toLowerCase().includes(txSearch.toLowerCase()) || 
                          t.cat.toLowerCase().includes(txSearch.toLowerCase());
    const matchesFilter = txFilter === 'all' || 
                          (txFilter === 'card' && t.type === 'card') || 
                          (txFilter === 'cash' && t.type === 'cash');
    return matchesSearch && matchesFilter;
  });

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
                          j.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
                          j.loc.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesHighPay = !onlyHighPayJobs || j.isHighPay || j.salary >= 10000000;
    return matchesSearch && matchesHighPay;
  });

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(restSearch.toLowerCase()) ||
                          r.cat.toLowerCase().includes(restSearch.toLowerCase()) ||
                          r.address.toLowerCase().includes(restSearch.toLowerCase());
    const matchesPrice = restPriceFilter === 'all' || r.tag === restPriceFilter;
    return matchesSearch && matchesPrice;
  });

  const expenseStatus = getExpenseStatus();

  if (pageMode === 'admin') {
    return (
      <div className="w-full min-h-screen bg-slate-50 text-slate-900 p-3 sm:p-8 overflow-y-auto">
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-3 transition-all duration-300 ${
            toast.type === 'error' ? 'bg-rose-50 border-rose-300 text-rose-800' :
            toast.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
            'bg-white/90 border-slate-300 text-slate-800'
          }`}>
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
            {toast.type === 'info' && <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />}
            <span className="text-xs font-medium">{toast.message}</span>
          </div>
        )}

        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-none">Admin Panel</h1>
                <span className="text-[10px] text-slate-500 font-mono">startapp.uz/admin — alohida sahifa</span>
              </div>
            </div>
            <button
              onClick={() => setPageMode('app')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5 border border-slate-300"
            >
              <X className="w-3.5 h-3.5" /> Ilovaga qaytish
            </button>
          </div>

          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-5">

            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-rose-600" /> Admin Dashboard (Tizim Boshqaruvi)
                </h3>
                <p className="text-xs text-slate-500">Vakansiyalar va Restoranlarni qo'shish, tahrirlash va o'chirish</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Vakansiyalar Boshqaruvi
                </h4>
                <button 
                  onClick={() => {
                    setEditingJob(null);
                    setJobForm({
                      title: '', company: '', salary: '', type: 'To\'liq stavka', 
                      tags: '', loc: 'Toshkent', address: '', lat: '41.311', lng: '69.279', isHighPay: false, isVip: false
                    });
                    setIsAdminJobModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Yangi Vakansiya Qo'shish
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2">Lavozim / Kompaniya</th>
                      <th className="p-2">Maosh</th>
                      <th className="p-2">Manzil & Lat/Lng</th>
                      <th className="p-2">Bayroqlar</th>
                      <th className="p-2 text-center">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    {jobs.map(j => (
                      <tr key={j.id} className="hover:bg-slate-100/30">
                        <td className="p-2">
                          <p className="font-bold text-slate-800">{j.title}</p>
                          <p className="text-[10px] text-slate-500">{j.company} • {j.loc}</p>
                        </td>
                        <td className="p-2 font-mono font-bold text-emerald-600">
                          {j.salary.toLocaleString()} UZS
                        </td>
                        <td className="p-2 text-[10px] text-slate-500 max-w-xs truncate">
                          {j.address} ({j.lat}, {j.lng})
                        </td>
                        <td className="p-2 space-x-1">
                          {j.isHighPay && <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 text-[9px]">HighPay</span>}
                          {j.isVip && <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-600 text-[9px]">VIP</span>}
                        </td>
                        <td className="p-2 text-center space-x-2">
                          <button onClick={() => openEditJobModal(j)} className="p-1 text-sky-600 hover:text-sky-600">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteAdminJob(j.id)} className="p-1 text-rose-600 hover:text-rose-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" /> Restoranlar Boshqaruvi
                </h4>
                <button 
                  onClick={() => {
                    setEditingRest(null);
                    setRestForm({
                      name: '', cat: 'Milliy taomlar', avgPrice: '', tag: 'Arzon', 
                      rating: '4.5', desc: '', badge: 'Tavsiya', dist: '1.0 km', 
                      address: '', lat: '41.311', lng: '69.279'
                    });
                    setIsAdminRestModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Yangi Restoran Qo'shish
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-2">Restoran Nomi</th>
                      <th className="p-2">O'rtacha Narx</th>
                      <th className="p-2">Taqdimot & Tag</th>
                      <th className="p-2">Manzil</th>
                      <th className="p-2 text-center">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    {restaurants.map(r => (
                      <tr key={r.id} className="hover:bg-slate-100/30">
                        <td className="p-2 font-bold text-slate-800">{r.name}</td>
                        <td className="p-2 font-mono text-emerald-600 font-bold">{r.avgPrice.toLocaleString()} UZS</td>
                        <td className="p-2">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px]">{r.tag}</span>
                        </td>
                        <td className="p-2 text-[10px] text-slate-500 max-w-xs truncate">{r.address}</td>
                        <td className="p-2 text-center space-x-2">
                          <button onClick={() => openEditRestModal(r)} className="p-1 text-sky-600 hover:text-sky-600">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteAdminRest(r.id)} className="p-1 text-rose-600 hover:text-rose-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {isAdminJobModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto">
              <h3 className="text-sm font-bold text-slate-900">
                {editingJob ? "Vakansiyani Tahrirlash" : "Yangi Vakansiya Qo'shish"}
              </h3>
              <form onSubmit={handleSaveAdminJob} className="space-y-2.5 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1">Lavozim Nomi (Title)</label>
                  <input 
                    type="text" required value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="Senior React Dasturchi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 mb-1">Kompaniya</label>
                    <input 
                      type="text" required value={jobForm.company}
                      onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                      placeholder="TechStart LLC"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Oylik Maosh (UZS)</label>
                    <input 
                      type="number" required value={jobForm.salary}
                      onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                      placeholder="15000000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Aniq Manzil (Address)</label>
                  <input 
                    type="text" required value={jobForm.address}
                    onChange={(e) => setJobForm({ ...jobForm, address: e.target.value })}
                    placeholder="IT Park, Yunusobod 4, Toshkent"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 mb-1">Xarita Lat</label>
                    <input 
                      type="text" value={jobForm.lat}
                      onChange={(e) => setJobForm({ ...jobForm, lat: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Xarita Lng</label>
                    <input 
                      type="text" value={jobForm.lng}
                      onChange={(e) => setJobForm({ ...jobForm, lng: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Teglar (Vergul bilan)</label>
                  <input 
                    type="text" value={jobForm.tags}
                    onChange={(e) => setJobForm({ ...jobForm, tags: e.target.value })}
                    placeholder="React, Node, JS"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                  />
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox" checked={jobForm.isHighPay}
                      onChange={(e) => setJobForm({ ...jobForm, isHighPay: e.target.checked })}
                      className="rounded bg-slate-50 border-slate-200"
                    />
                    <span>Eng ko'p maoshli</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-amber-600 cursor-pointer">
                    <input 
                      type="checkbox" checked={jobForm.isVip}
                      onChange={(e) => setJobForm({ ...jobForm, isVip: e.target.checked })}
                      className="rounded bg-slate-50 border-slate-200"
                    />
                    <span>VIP Obuna Vakansiyasi</span>
                  </label>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    type="button" onClick={() => setIsAdminJobModalOpen(false)}
                    className="w-1/2 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                  >
                    Bekor qilish
                  </button>
                  <button type="submit" className="w-1/2 py-2 bg-purple-600 text-white font-bold rounded-xl">
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isAdminRestModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto">
              <h3 className="text-sm font-bold text-slate-900">
                {editingRest ? "Restoranni Tahrirlash" : "Yangi Restoran Qo'shish"}
              </h3>
              <form onSubmit={handleSaveAdminRest} className="space-y-2.5 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1">Restoran Nomi</label>
                  <input 
                    type="text" required value={restForm.name}
                    onChange={(e) => setRestForm({ ...restForm, name: e.target.value })}
                    placeholder="Evos Fast Food"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:border-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 mb-1">O'rtacha Narx (UZS)</label>
                    <input 
                      type="number" required value={restForm.avgPrice}
                      onChange={(e) => setRestForm({ ...restForm, avgPrice: e.target.value })}
                      placeholder="30000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Narx Teg (Filter)</label>
                    <select 
                      value={restForm.tag}
                      onChange={(e) => setRestForm({ ...restForm, tag: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                    >
                      <option value="Arzon">Arzon</option>
                      <option value="Sifatli">Sifatli</option>
                      <option value="Qimmat">Qimmat</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Aniq Manzil</label>
                  <input 
                    type="text" required value={restForm.address}
                    onChange={(e) => setRestForm({ ...restForm, address: e.target.value })}
                    placeholder="Chilonzor 12, Toshkent"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Tavsif (Taqdimot)</label>
                  <textarea 
                    value={restForm.desc}
                    onChange={(e) => setRestForm({ ...restForm, desc: e.target.value })}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 mb-1">Xarita Lat</label>
                    <input 
                      type="text" value={restForm.lat}
                      onChange={(e) => setRestForm({ ...restForm, lat: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Xarita Lng</label>
                    <input 
                      type="text" value={restForm.lng}
                      onChange={(e) => setRestForm({ ...restForm, lng: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    type="button" onClick={() => setIsAdminRestModalOpen(false)}
                    className="w-1/2 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                  >
                    Bekor qilish
                  </button>
                  <button type="submit" className="w-1/2 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl">
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none overflow-hidden">
      
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-3 transition-all duration-300 ${
          toast.type === 'error' ? 'bg-rose-50 border-rose-300 text-rose-800' :
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
          'bg-white/90 border-slate-300 text-slate-800'
        }`}>
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          {toast.type === 'info' && <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />}
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden bg-slate-50 min-h-0">
        
        <aside className="w-16 sm:w-56 bg-white/80 backdrop-blur-md border-r border-slate-200/80 flex flex-col justify-between p-2 sm:p-3 text-slate-700 shrink-0">
          <div>
            <div className="flex items-center gap-3 px-2 py-1.5 mb-3 border-b border-slate-200/80">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20">
                S
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-slate-900 text-sm leading-none">StartApp</h1>
                <span className="text-[9px] text-emerald-600 font-medium tracking-wide">FINANCE & CAREER</span>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Bosh sahifa', icon: HomeIcon, color: 'text-emerald-600' },
                { id: 'jobs', label: 'Ishlar va Xarita', icon: Briefcase, color: 'text-purple-600' },
                { id: 'food', label: 'Restoranlar & Narx', icon: Utensils, color: 'text-emerald-600' },
                { id: 'analysis', label: 'Xarajat Tahlili', icon: PieChart, color: 'text-indigo-600' },
                { id: 'transactions', label: 'Ishlatilgan Pullar', icon: Receipt, color: 'text-amber-600' },
                { id: 'card', label: 'Kartani Ulash', icon: CreditCard, color: 'text-sky-600' },
                { id: 'goals', label: 'Jamg\'arma va Reja', icon: PiggyBank, color: 'text-pink-600' },
                { id: 'profile', label: 'Profil', icon: User, color: 'text-slate-500' }
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl transition text-left text-xs font-medium ${
                      isActive 
                        ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 font-semibold' 
                        : 'hover:bg-slate-100/60 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : item.color}`} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setIsPremiumModalOpen(true)}
              className="w-full flex items-center justify-center sm:justify-start gap-2 px-2.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
            >
              <Crown className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{isPremium ? "Premium status" : "Premium VIP olish"}</span>
            </button>

            <button
              onClick={toggleBrowserFullscreen}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100/60 hover:text-slate-800 transition"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isFullscreen ? "Kichiklashtirish" : "To'liq ekran"}</span>
            </button>

            <div 
              onClick={() => setActiveTab('profile')}
              className="cursor-pointer bg-slate-100/40 hover:bg-slate-100 p-2 rounded-xl border border-slate-300/40 flex items-center gap-2.5 transition"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                SA
              </div>
              <div className="hidden sm:block overflow-hidden">
                <p className="text-xs font-semibold text-slate-900 truncate">{userProfile.name}</p>
                <p className="text-[9px] text-emerald-600 truncate font-medium flex items-center gap-1">
                  {isPremium && <Crown className="w-2.5 h-2.5 text-amber-600" />} {isPremium ? "VIP Obunachi" : userProfile.status}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-3 sm:p-5 bg-slate-50 space-y-4 min-h-0">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={toggleVoiceRecognition}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all shadow-lg shrink-0 ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/30' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20'
                }`}
                title="Ovoz bilan xarajat qo'shish"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>Ovozli Xarajat Kiritish</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">Speech AI</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  {voiceText ? voiceText : 'Tugmani bosing va ayting: "Do\'kondan 15000 ga fanta oldim"'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSimulatedVoiceSubmit} className="flex items-center gap-2 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Simulyatsiya uchun matn..."
                value={simulatedInput}
                onChange={(e) => setSimulatedInput(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 w-full md:w-56 font-mono"
              />
              <button 
                type="submit" 
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-xl transition border border-slate-300 shrink-0"
              >
                Kiritish
              </button>
            </form>
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                <div className="bg-gradient-to-br from-white to-white/80 border border-slate-200 p-4 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-slate-500 font-medium">Karta Balansi ({isCardLinked ? cardDetails.type : 'Ulanmagan'})</p>
                    <CreditCard className={`w-5 h-5 ${isCardLinked ? 'text-emerald-600' : 'text-slate-600'}`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 font-mono">
                    {isCardLinked ? cardBalance.toLocaleString() : '0'} <span className="text-xs font-sans text-slate-500">UZS</span>
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-medium">
                      {isCardLinked ? cardDetails.number : 'Karta Yo\'q'}
                    </span>
                    <button onClick={() => setActiveTab('card')} className="text-[11px] text-emerald-600 hover:underline">
                      Sozlash
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-white/80 border border-slate-200 p-4 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-slate-500 font-medium">Naqd Pul Balansi</p>
                    <DollarSign className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 font-mono">
                    {cashBalance.toLocaleString()} <span className="text-xs font-sans text-slate-500">UZS</span>
                  </h3>
                  <button 
                    onClick={() => setIsAddCashOpen(true)}
                    className="mt-3 text-xs text-emerald-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" /> Naqd pul qo'shish
                  </button>
                </div>

                <div className="bg-gradient-to-br from-white to-white/80 border border-slate-200 p-4 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-slate-500 font-medium">Jami Chiqimlar</p>
                    <Receipt className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 font-mono">
                    {totalExpenses.toLocaleString()} <span className="text-xs font-sans text-slate-500">UZS</span>
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${expenseStatus.bg} ${expenseStatus.color}`}>
                      {expenseStatus.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-amber-500/10 via-white to-white border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Premium VIP Imkoniyatlari</h4>
                    </div>
                    <p className="text-xs text-slate-500">VIP vakansiyalar, restoranlarda -10% chegirma va ustuvor qo'llab-quvvatlash.</p>
                  </div>
                  <button 
                    onClick={() => setIsPremiumModalOpen(true)}
                    className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg shrink-0"
                  >
                    {isPremium ? "Obuna Faol" : "VIP Ulash"}
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 via-white to-white border border-purple-500/30 p-4 rounded-2xl flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Settings className="w-4 h-4 text-purple-600" />
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Admin Dashboard</h4>
                    </div>
                    <p className="text-xs text-slate-500">Alohida sahifada: vakansiyalar va restoranlarni xarita koordinatalari bilan boshqarish.</p>
                  </div>
                  <button 
                    onClick={() => setPageMode('admin')}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition shrink-0"
                  >
                    Admin Panel
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-900">Xarajat Kategoriyalari</h4>
                  <button onClick={() => setActiveTab('analysis')} className="text-[11px] text-emerald-600 hover:underline">
                    To'liq tahlil
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { category: 'Oziq-ovqat va Restoran', percent: 45, amount: 675000, color: 'bg-emerald-500' },
                    { category: 'Transport va Yonilg\'i', percent: 25, amount: 375000, color: 'bg-sky-500' },
                    { category: 'Ko\'ngilochar & Xobbi', percent: 20, amount: 300000, color: 'bg-amber-500' },
                    { category: 'Aloqa va Kommunal', percent: 10, amount: 150000, color: 'bg-purple-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-slate-700">{item.category}</span>
                        <span className="text-slate-900 font-mono">{item.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono">{item.amount.toLocaleString()} UZS</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-900">Oxirgi Xarajatlar</h4>
                    <button onClick={() => setActiveTab('transactions')} className="text-[11px] text-emerald-600 hover:underline">
                      Barchasi
                    </button>
                  </div>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {transactions.slice(0, 5).map(tx => {
                      const isIncome = tx.amount > 0;
                      return (
                        <div key={tx.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                              isIncome ? 'bg-emerald-500/20 text-emerald-600' : 'bg-rose-500/20 text-rose-600'
                            }`}>
                              {isIncome ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800 text-xs">{tx.desc}</p>
                              <p className="text-[9px] text-slate-500">{tx.date} • {tx.cat}</p>
                            </div>
                          </div>
                          <span className={`font-mono font-bold text-xs ${isIncome ? 'text-emerald-600' : 'text-slate-800'}`}>
                            {isIncome ? '+' : ''}{tx.amount.toLocaleString()} UZS
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-900">Jamg'armalar Holati</h4>
                    <button onClick={() => setActiveTab('goals')} className="text-[11px] text-emerald-600 hover:underline">
                      Boshqarish
                    </button>
                  </div>
                  <div className="space-y-3">
                    {goals.map(g => {
                      const percent = Math.min(100, Math.round((g.saved / g.target) * 100));
                      return (
                        <div key={g.id} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-800">{g.name}</span>
                            <span className="font-mono text-emerald-600 font-bold text-xs">{percent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                            <span>Yig'ildi: {g.saved.toLocaleString()} UZS</span>
                            <span>Maqsad: {g.target.toLocaleString()} UZS</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-4">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>Vakansiyalar va Interaktiv Xarita</span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-600 text-[10px] font-mono">
                        {filteredJobs.length} ta vakansiya
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">Eng yuqori maoshli vakansiyalar va geo-joylashuv</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-56">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Vakansiya qidirish..."
                        value={jobSearch}
                        onChange={(e) => setJobSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <button 
                      onClick={() => setOnlyHighPayJobs(!onlyHighPayJobs)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                        onlyHighPayJobs 
                          ? 'bg-amber-500 text-slate-950 border-amber-400' 
                          : 'bg-slate-50 text-amber-600 border-slate-200 hover:border-amber-500/50'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" /> Eng ko'p maoshli
                    </button>
                  </div>
                </div>

                <div className="w-full h-64 sm:h-80 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col justify-between p-3">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>

                  <div className="relative z-10 flex justify-between items-center bg-white/90 border border-slate-200 rounded-xl p-2 px-3 text-xs text-slate-700 backdrop-blur-md">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Map className="w-3.5 h-3.5 text-purple-600" /> Toshkent va Samarqand Xaritasi Pinlari
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">GPS Simulated Leaflet Map</span>
                  </div>

                  <div className="relative z-10 flex-1 my-2 relative">
                    {filteredJobs.map((j) => {
                      const topPercent = Math.min(80, Math.max(15, (41.4 - j.lat) * 200 + 30));
                      const leftPercent = Math.min(85, Math.max(10, (j.lng - 66.5) * 25 + 20));
                      const isSelected = selectedMapJob?.id === j.id;

                      return (
                        <div 
                          key={j.id} 
                          style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                          onClick={() => setSelectedMapJob(j)}
                        >
                          <div className={`px-2 py-1 rounded-lg border text-[10px] font-bold font-mono shadow-xl flex items-center gap-1 transition-all ${
                            isSelected 
                              ? 'bg-purple-500 text-white border-purple-300 scale-110 z-30' 
                              : j.isHighPay 
                              ? 'bg-amber-500 text-slate-950 border-amber-300 z-20' 
                              : 'bg-white text-purple-600 border-purple-500/50 z-10 hover:scale-105'
                          }`}>
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{j.salary >= 10000000 ? `${(j.salary/1000000).toFixed(0)}M` : j.company}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedMapJob ? (
                    <div className="relative z-20 bg-white/95 border border-purple-500/50 rounded-xl p-3 text-xs flex justify-between items-center gap-3 shadow-2xl backdrop-blur-md animate-fadeIn">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{selectedMapJob.title}</span>
                          <span className="text-[9px] px-1.5 py-0.5 bg-purple-500/20 text-purple-600 rounded font-semibold">{selectedMapJob.company}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-600" /> {selectedMapJob.address}
                        </p>
                        <p className="text-emerald-600 font-mono font-bold">{selectedMapJob.salary.toLocaleString()} UZS / oy</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleApplyJob(selectedMapJob)}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition"
                        >
                          Topshirish
                        </button>
                        <button onClick={() => setSelectedMapJob(null)} className="text-slate-500 hover:text-slate-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="relative z-10 text-[11px] text-slate-500 text-center italic">
                      Xaritalar ustiga bosing va vakansiyaning aniq manzili hamda maoshini ko'ring
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {filteredJobs.map(j => (
                    <div key={j.id} className={`bg-slate-50 border p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition ${
                      j.isHighPay ? 'border-amber-500/40 bg-amber-500/5' : 'border-slate-200'
                    }`}>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{j.title}</h4>
                          {j.isHighPay && (
                            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-600 border border-amber-500/30 text-[9px] rounded font-bold flex items-center gap-0.5">
                              <TrendingUp className="w-2.5 h-2.5" /> Yuqori Maosh
                            </span>
                          )}
                          {j.isVip && (
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-600 border border-purple-500/30 text-[9px] rounded font-bold flex items-center gap-0.5">
                              <Crown className="w-2.5 h-2.5 text-amber-600" /> VIP Vakansiya
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] rounded">
                            {j.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{j.company} • {j.loc}</p>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-600 shrink-0" /> Manzil: {j.address}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {j.tags.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-white text-slate-500 text-[9px] rounded border border-slate-200">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-0 pt-2 sm:pt-0 border-slate-200">
                        <span className="text-emerald-600 font-mono font-bold text-sm sm:text-base">{j.salary.toLocaleString()} UZS</span>
                        <button 
                          onClick={() => handleApplyJob(j)}
                          className={`mt-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition ${
                            j.isVip && !isPremium 
                              ? 'bg-amber-500/20 text-amber-600 border border-amber-500/40 hover:bg-amber-500/30' 
                              : 'bg-purple-600 hover:bg-purple-500 text-white'
                          }`}
                        >
                          {j.isVip && !isPremium ? "VIP Obuna Bilan" : "Topshirish"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'food' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-4">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>Arzon Restoranlar va Milliy Taomlar</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 text-[10px] font-mono">
                        {filteredRestaurants.length} ta joy
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">Hamyonbop tushlik, chegirmalar va geolokatsiya</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-48">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Restoran qidirish..."
                        value={restSearch}
                        onChange={(e) => setRestSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <select 
                      value={restPriceFilter}
                      onChange={(e) => setRestPriceFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="all">Barcha Narx Turlari</option>
                      <option value="Arzon">Faqat Arzon</option>
                      <option value="Sifatli">Sifatli & O'rtacha</option>
                      <option value="Qimmat">Qimmat & Premium</option>
                    </select>
                  </div>
                </div>

                <div className="w-full h-64 sm:h-72 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col justify-between p-3">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>

                  <div className="relative z-10 flex justify-between items-center bg-white/90 border border-slate-200 rounded-xl p-2 px-3 text-xs text-slate-700 backdrop-blur-md">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" /> Restoran va Kafelar Xaritasi Pinlari
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Distance & Price Tag Pins</span>
                  </div>

                  <div className="relative z-10 flex-1 my-2 relative">
                    {filteredRestaurants.map((r) => {
                      const topPercent = Math.min(80, Math.max(15, (41.35 - r.lat) * 300 + 40));
                      const leftPercent = Math.min(85, Math.max(10, (r.lng - 69.2) * 200 + 20));
                      const isSelected = selectedMapRest?.id === r.id;

                      return (
                        <div 
                          key={r.id} 
                          style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                          onClick={() => setSelectedMapRest(r)}
                        >
                          <div className={`px-2 py-1 rounded-lg border text-[10px] font-bold font-mono shadow-xl flex items-center gap-1 transition-all ${
                            isSelected 
                              ? 'bg-emerald-500 text-slate-950 border-emerald-300 scale-110 z-30' 
                              : 'bg-white text-emerald-600 border-emerald-500/50 z-10 hover:scale-105'
                          }`}>
                            <Utensils className="w-3 h-3 shrink-0" />
                            <span>{r.name.split(' ')[0]} ({r.avgPrice/1000}k)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedMapRest ? (
                    <div className="relative z-20 bg-white/95 border border-emerald-500/50 rounded-xl p-3 text-xs flex justify-between items-center gap-3 shadow-2xl backdrop-blur-md animate-fadeIn">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{selectedMapRest.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-600 rounded font-semibold">{selectedMapRest.tag}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" /> {selectedMapRest.address}
                        </p>
                        <p className="text-emerald-600 font-mono font-bold">O'rtacha check: {selectedMapRest.avgPrice.toLocaleString()} UZS</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleOrderFood(selectedMapRest.name, selectedMapRest.avgPrice)}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold rounded-lg transition"
                        >
                          Buyurtma
                        </button>
                        <button onClick={() => setSelectedMapRest(null)} className="text-slate-500 hover:text-slate-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="relative z-10 text-[11px] text-slate-500 text-center italic">
                      Xaritalar ustiga bosing va restaurant taomnomasini hamda narxlarini ko'ring
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredRestaurants.map(r => (
                    <div key={r.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-emerald-500/50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{r.name}</h4>
                          <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600" /> {r.dist} • {r.cat}
                          </p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          r.tag === 'Arzon' ? 'bg-emerald-500/20 text-emerald-600' :
                          r.tag === 'Qimmat' ? 'bg-purple-500/20 text-purple-600' : 'bg-sky-500/20 text-sky-600'
                        }`}>
                          {r.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{r.desc}</p>
                      <p className="text-[10px] text-slate-500">Manzil: {r.address}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                        <span className="text-xs font-mono text-emerald-600 font-bold">
                          O'rtacha: {r.avgPrice.toLocaleString()} UZS
                        </span>
                        <button 
                          onClick={() => handleOrderFood(r.name, r.avgPrice)}
                          className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition"
                        >
                          Buyurtma Berish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl">
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">To'liq Xarajatlar Tahlili va Maslahatlar</h3>
                <p className="text-xs text-slate-500 mb-4">Sun'iy intellekt va moliyaviy me'yorlar asosidagi statistika</p>

                <div className="space-y-3 max-w-2xl">
                  {[
                    { category: 'Oziq-ovqat va Restoran', percent: 45, amount: 675000, color: 'bg-emerald-500' },
                    { category: 'Transport va Yonilg\'i', percent: 25, amount: 375000, color: 'bg-sky-500' },
                    { category: 'Ko\'ngilochar & Xobbi', percent: 20, amount: 300000, color: 'bg-amber-500' },
                    { category: 'Aloqa va Kommunal', percent: 10, amount: 150000, color: 'bg-purple-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{item.category}</span>
                        <span className="text-slate-900 font-mono">{item.percent}% ({item.amount.toLocaleString()} UZS)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" /> Tejamkorlik Darajasi: Yuqori
                    </div>
                    <p className="text-xs text-slate-700">
                      Siz oziq-ovqat xarajatlarini nazorat qilmoqdasiz. Arzon restoranlar bo'limidan foydalanib oylik 150,000 UZS tejang.
                    </p>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
                    <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
                      <AlertCircle className="w-4 h-4" /> Transport Xarajatlari
                    </div>
                    <p className="text-xs text-slate-700">
                      Taksi xarajatlari o'tgan haftaga nisbatan 15% ga oshgan. Jamoat transportidan foydalanish tavsiya etiladi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Ishlatilgan Pullar Tarixi</h3>
                    <p className="text-xs text-slate-500">Barcha moliyaviy operatsiyalar ro'yxati</p>
                  </div>
                  <button 
                    onClick={() => setIsAddTxModalOpen(true)}
                    className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Yangi Xarajat Qo'shish
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
                  <div className="flex-1 relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Xarajat bo'yicha qidirish..."
                      value={txSearch}
                      onChange={(e) => setTxSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <select 
                    value={txFilter} 
                    onChange={(e) => setTxFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="all">Barcha manbalar</option>
                    <option value="card">Faqat Bank Kartasi</option>
                    <option value="cash">Faqat Naqd Pul</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-mono border-b border-slate-200 text-[10px]">
                      <tr>
                        <th className="p-2.5">Sana / Vaqt</th>
                        <th className="p-2.5">Tavsif</th>
                        <th className="p-2.5">Kategoriya</th>
                        <th className="p-2.5">Manba</th>
                        <th className="p-2.5 text-right">Summa</th>
                        <th className="p-2.5 text-center">Amal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50">
                      {filteredTransactions.map(tx => {
                        const isIncome = tx.amount > 0;
                        return (
                          <tr key={tx.id} className="hover:bg-slate-100/30 transition">
                            <td className="p-2.5 font-mono text-slate-500">{tx.date}</td>
                            <td className="p-2.5 font-semibold text-slate-800">{tx.desc}</td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                                {tx.cat}
                              </span>
                            </td>
                            <td className="p-2.5 text-slate-500">{tx.source}</td>
                            <td className={`p-2.5 text-right font-mono font-bold ${isIncome ? 'text-emerald-600' : 'text-slate-800'}`}>
                              {isIncome ? '+' : ''}{tx.amount.toLocaleString()} UZS
                            </td>
                            <td className="p-2.5 text-center">
                              <button 
                                onClick={() => handleDeleteTx(tx.id)}
                                className="p-1 text-slate-500 hover:text-rose-600 transition"
                                title="O'chirish"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center justify-center space-y-4">
                  <div className={`w-full max-w-sm h-48 rounded-2xl bg-gradient-to-tr ${
                    isCardLinked ? 'from-emerald-600 via-teal-700 to-emerald-950 border-emerald-400/30' : 'from-slate-700 via-slate-700 to-slate-800 border-slate-300'
                  } p-5 flex flex-col justify-between shadow-2xl border relative overflow-hidden transition-all duration-300`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-base italic text-white tracking-wider">{cardDetails.type}</span>
                      <CreditCard className={`w-5 h-5 ${isCardLinked ? 'text-emerald-200' : 'text-slate-500'}`} />
                    </div>
                    <div className="my-auto">
                      <p className="text-[9px] text-emerald-200 uppercase tracking-widest mb-1">Karta Raqami</p>
                      <p className="font-mono text-base sm:text-lg text-white tracking-widest font-bold">
                        {isCardLinked ? cardDetails.number : '**** **** **** ****'}
                      </p>
                    </div>
                    <div className="flex justify-between items-end text-xs text-white">
                      <div>
                        <p className="text-[8px] text-emerald-200 uppercase">Ega ismi</p>
                        <p className="font-semibold uppercase tracking-wider">{cardDetails.holder}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-emerald-200 uppercase">Muddati</p>
                        <p className="font-mono font-semibold">{cardDetails.exp}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsCardLinked(!isCardLinked);
                      showToast(isCardLinked ? "Karta uzildi!" : "Karta mofaqqiyatli ulandi!", isCardLinked ? "info" : "success");
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                      isCardLinked 
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 hover:bg-rose-500/20' 
                        : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 border-transparent'
                    }`}
                  >
                    {isCardLinked ? "Kartani Uzish" : "Kartani Boshidan Ulash"}
                  </button>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Bank Kartasini Ulash / Yangilash</h3>
                  <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    setIsCardLinked(true); 
                    showToast("Karta ma'lumotlari yangilandi!", "success"); 
                  }} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-500 mb-1">Karta Turi</label>
                      <select 
                        value={cardDetails.type}
                        onChange={(e) => setCardDetails({ ...cardDetails, type: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Humo">Humo Card</option>
                        <option value="Uzcard">Uzcard</option>
                        <option value="Visa">Visa Uzbek</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Karta Raqami</label>
                      <input 
                        type="text" 
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 mb-1">Muddati</label>
                        <input 
                          type="text" 
                          value={cardDetails.exp}
                          onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 mb-1">Egasining Ismi</label>
                        <input 
                          type="text" 
                          value={cardDetails.holder}
                          onChange={(e) => setCardDetails({ ...cardDetails, holder: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 uppercase focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition">
                      Kartani Muvaffaqiyatli Saqlash
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Jamg'arma va Reja Maqsadlari</h3>
                    <p className="text-xs text-slate-500">Orzular va maqsadlar uchun avto-yig'im</p>
                  </div>
                  <button 
                    onClick={() => setIsAddGoalModalOpen(true)}
                    className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Yangi Maqsad
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goals.map(g => {
                    const percent = Math.min(100, Math.round((g.saved / g.target) * 100));
                    return (
                      <div key={g.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2.5">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-slate-900">{g.name}</span>
                            <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{g.category}</span>
                          </div>
                          <span className="text-xs text-emerald-600 font-mono font-bold">{percent}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                          <span>Yig'ildi: {g.saved.toLocaleString()} UZS</span>
                          <span>Maqsad: {g.target.toLocaleString()} UZS</span>
                        </div>
                        <button 
                          onClick={() => depositGoal(g.id, 500000)} 
                          className="w-full py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition"
                        >
                          +500,000 UZS Kartadan Qo'shish
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl max-w-lg mx-auto space-y-4">
                
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 font-bold text-xl flex items-center justify-center mx-auto border-2 border-emerald-500/40 shadow-lg relative">
                    SA
                    {isPremium && (
                      <div className="absolute -bottom-1 -right-1 p-1 bg-amber-500 text-slate-950 rounded-full shadow" title="Premium Active">
                        <Crown className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{userProfile.name}</h3>
                  <p className="text-xs text-slate-500">{userProfile.email}</p>
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[11px] rounded-full font-medium">
                    {isPremium ? "StartApp VIP Premium" : userProfile.status}
                  </span>
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-3 text-xs pt-2 border-t border-slate-200">
                    <div>
                      <label className="block text-slate-500 mb-1">To'liq Ism</label>
                      <input 
                        type="text" 
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Telefon Raqam</label>
                      <input 
                        type="text" 
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Email Pochta</label>
                      <input 
                        type="email" 
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button 
                        type="button" 
                        onClick={() => setIsEditingProfile(false)}
                        className="w-1/2 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                      >
                        Bekor qilish
                      </button>
                      <button 
                        type="submit" 
                        className="w-1/2 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl"
                      >
                        Saqlash
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-2 text-xs pt-2 border-t border-slate-200">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                      <span className="text-slate-500">Telefon</span>
                      <span className="text-slate-800 font-mono">{userProfile.phone}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                      <span className="text-slate-500">Xavfsizlik & FaceID</span>
                      <span className="text-emerald-600 font-medium">Yoqilgan</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                      <span className="text-slate-500">Valyuta</span>
                      <span className="text-slate-800 font-mono">{userProfile.currency}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setProfileForm({ ...userProfile });
                        setIsEditingProfile(true);
                      }}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition flex items-center justify-center gap-1.5 mt-2"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Profilni Tahrirlash
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}

        </main>
      </div>

      {isPremiumModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-amber-500/40 rounded-2xl p-5 w-full max-w-md space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setIsPremiumModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/30">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">StartApp Premium VIP Obuna</h3>
              <p className="text-xs text-slate-500">Har oylik VIP xizmatlar to'plami</p>
            </div>

            <div className="space-y-2 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs">
              {[
                "Eksklyuziv yuqori maoshli VIP vakansiyalar",
                "Restoranlarda taom buyurtmalariga -10% avto-chegirma",
                "Tezkor ovozli sun'iy intellekt xarajatlar tahlili",
                "Ustuvor 24/7 qo'llab-quvvatlash xizmati"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <div>
                <p className="text-[10px] text-amber-600 font-semibold uppercase">Oylik To'lov</p>
                <p className="text-base font-bold text-slate-900 font-mono">49,000 UZS <span className="text-xs font-normal text-slate-500">/ oy ($5)</span></p>
              </div>
              <span className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-lg">PRO TAKLIF</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block text-slate-500 font-medium">To'lov Tizimini Tanlang:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'payme', name: 'Payme' },
                  { id: 'click', name: 'Click' },
                  { id: 'card', name: 'Visa/Master' }
                ].map(m => (
                  <button 
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedPayMethod(m.id)}
                    className={`py-2 rounded-xl border text-center font-bold text-xs transition ${
                      selectedPayMethod === m.id 
                        ? 'bg-amber-500 text-slate-950 border-amber-400' 
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button 
                type="button" 
                onClick={() => setIsPremiumModalOpen(false)}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Yopish
              </button>
              <button 
                type="button" 
                onClick={handleSubscribePremium}
                className="w-1/2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition"
              >
                {isPremium ? "Obunani Yangilash" : "49,000 UZS To'lash"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddTxModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-md space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Yangi Xarajat Qo'shish</h3>
            <form onSubmit={handleAddManualTx} className="space-y-2.5 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">Xarajat Nomi / Tavsifi</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masalan: Korzinka supermarket"
                  value={manualTx.desc}
                  onChange={(e) => setManualTx({ ...manualTx, desc: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Summa (UZS)</label>
                <input 
                  type="number" 
                  required
                  placeholder="50000"
                  value={manualTx.amount}
                  onChange={(e) => setManualTx({ ...manualTx, amount: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-500 mb-1">Kategoriya</label>
                  <select 
                    value={manualTx.category}
                    onChange={(e) => setManualTx({ ...manualTx, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Oziq-ovqat">Oziq-ovqat</option>
                    <option value="Transport">Transport</option>
                    <option value="Ko'ngilochar">Ko'ngilochar</option>
                    <option value="Aloqa">Aloqa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Manba</label>
                  <select 
                    value={manualTx.source}
                    onChange={(e) => setManualTx({ ...manualTx, source: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Humo Card">Humo Card</option>
                    <option value="Uzcard">Uzcard</option>
                    <option value="Naqd Pul">Naqd Pul</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddTxModalOpen(false)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddCashOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Naqd Pul Kiritish</h3>
            <form onSubmit={handleAddCash} className="space-y-2.5 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">Summa (UZS)</label>
                <input 
                  type="number" 
                  required
                  placeholder="100000"
                  value={newCashAmt}
                  onChange={(e) => setNewCashAmt(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddCashOpen(false)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddGoalModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Yangi Jamg'arma Maqsadi</h3>
            <form onSubmit={handleAddGoal} className="space-y-2.5 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">Maqsad Nomi</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masalan: Yangi Telefon"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Maqsad Summasi (UZS)</label>
                <input 
                  type="number" 
                  required
                  placeholder="10000000"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Kategoriya</label>
                <select 
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Texnika">Texnika</option>
                  <option value="Sayohat">Sayohat</option>
                  <option value="Xavfsizlik">Xavfsizlik</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddGoalModalOpen(false)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}