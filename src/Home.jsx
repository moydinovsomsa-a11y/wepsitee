import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    ShoppingCart,
    User,
    Truck,
    LayoutDashboard,
    X,
    Plus,
    Minus,
    MapPin,
    Phone,
    Info,
    Sparkles,
    CheckCircle2,
    LogOut,
    Lock,
    UserPlus,
    Heart,
    Bell,
    Home as HomeIcon,
    Grid3x3,
    MessageCircle
} from "lucide-react";


function DiscountTag({ children, className = "" }) {
    return (
        <span
            className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md ${className}`}
        >
            <Sparkles className="w-3 h-3" />
            {children}
        </span>
    );
}

const CATEGORIES = [
    { key: "", emoji: "🧺", label: "Barchasi", sub: "Barcha mahsulotlar" },
    { key: "oziq", emoji: "🥗", label: "Oziq-ovqat", sub: "Non, guruch, yog'" },
    { key: "texnika", emoji: "📱", label: "Texnika", sub: "Telefon, televizor" },
    { key: "ichimlik", emoji: "🧃", label: "Ichimliklar", sub: "Suv, sharbat" },
    { key: "bolalar", emoji: "🧸", label: "Bolalar", sub: "Bolalar uchun" },
    { key: "go'zallik", emoji: "💄", label: "Go'zallik", sub: "Parvarish" }
];


function AuthGate({ onAuth }) {
    const [mode, setMode] = useState("login"); 
    const [error, setError] = useState("");

    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [registerData, setRegisterData] = useState({
        name: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (!loginData.username || !loginData.password) {
            setError("Login va parolni kiriting.");
            return;
        }
        setError("");
        onAuth({ name: loginData.username });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!registerData.name || !registerData.username || !registerData.password) {
            setError("Barcha majburiy maydonlarni to'ldiring.");
            return;
        }
        if (registerData.password !== registerData.confirmPassword) {
            setError("Parollar bir-biriga mos emas.");
            return;
        }
        setError("");
        onAuth({ name: registerData.name });
    };

    const switchMode = (next) => {
        setMode(next);
        setError("");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans antialiased">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center gap-2.5 mb-8">
                    <span className="w-11 h-11 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-base shadow-md shadow-indigo-200">
                        MR
                    </span>
                    <span className="font-bold text-2xl tracking-tight text-slate-900">
                        shoping<span className="text-indigo-600">.</span>
                    </span>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-2">
                        <button
                            onClick={() => switchMode("login")}
                            className={`flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                                mode === "login" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 border-b border-slate-200 hover:text-slate-600"
                            }`}
                        >
                            <Lock className="w-4 h-4" /> Kirish
                        </button>
                        <button
                            onClick={() => switchMode("register")}
                            className={`flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                                mode === "register" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 border-b border-slate-200 hover:text-slate-600"
                            }`}
                        >
                            <UserPlus className="w-4 h-4" /> Ro'yxatdan o'tish
                        </button>
                    </div>

                    <div className="p-6 sm:p-7">
                        {error && (
                            <div className="mb-4 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                                {error}
                            </div>
                        )}

                        {mode === "login" ? (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600">Login</label>
                                    <input
                                        type="text"
                                        value={loginData.username}
                                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                        placeholder="Foydalanuvchi nomi"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600">Parol</label>
                                    <input
                                        type="password"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                    />
                                </div>
                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-indigo-100 transition-all">
                                    Kirish
                                </button>
                                <p className="text-center text-xs text-slate-400">
                                    Hisobingiz yo'qmi?{" "}
                                    <button type="button" onClick={() => switchMode("register")} className="text-indigo-600 font-semibold hover:underline">
                                        Ro'yxatdan o'ting
                                    </button>
                                </p>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600">Ismingiz</label>
                                    <input
                                        type="text"
                                        value={registerData.name}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                        placeholder="Masalan: Ali Valiyev"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600">Telefon raqam</label>
                                    <input
                                        type="text"
                                        value={registerData.phone}
                                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                                        placeholder="+998 90 123 45 67"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600">Login</label>
                                    <input
                                        type="text"
                                        value={registerData.username}
                                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                        placeholder="Foydalanuvchi nomi"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5 text-slate-600">Parol</label>
                                        <input
                                            type="password"
                                            value={registerData.password}
                                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5 text-slate-600">Tasdiqlash</label>
                                        <input
                                            type="password"
                                            value={registerData.confirmPassword}
                                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-indigo-100 transition-all">
                                    Ro'yxatdan o'tish
                                </button>
                                <p className="text-center text-xs text-slate-400">
                                    Hisobingiz bormi?{" "}
                                    <button type="button" onClick={() => switchMode("login")} className="text-indigo-600 font-semibold hover:underline">
                                        Kiring
                                    </button>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Home() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);


    const [checkoutData, setCheckoutData] = useState({
        name: "",
        phone: "",
        location: ""
    });


    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem("mr_shoping_user");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

 
    const [favorites, setFavorites] = useState([]);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);


    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isContactSent, setIsContactSent] = useState(false);
    const [contactData, setContactData] = useState({ name: "", phone: "", message: "" });


    const [activeCategory, setActiveCategory] = useState("");


    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        fetch("http://127.0.0.1:8000/api/rest/")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts([
                        { id: 101, nomi: "Shakar 1kg", kategoriya: "oziq", narxi: "14000", yetkazish: "Bugun", chegirmadagi: "-10%", rasm: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500", tavsif: "Oliy navli, mahalliy ishlab chiqarilgan toza shakar." },
                        { id: 102, nomi: "Suyuq sovun 500ml", kategoriya: "go'zallik", narxi: "22000", yetkazish: "1 kun", chegirmadagi: "", rasm: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500", tavsif: "Teringizni muloyim tozalovchi va xushbo'y hid beruvchi suyuq sovun." }
                    ]);
                }
                setLoading(false);
            })
            .catch(() => {
                setProducts([
                    { id: 101, nomi: "O'simlik yog'i 1L", kategoriya: "oziq", narxi: "18000", yetkazish: "Bugun", chegirmadagi: "-5%", rasm: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500", tavsif: "Tozalangan kungaboqar yog'i, pishiriq va taomlar uchun mos." },
                    { id: 102, nomi: "Guruch Alanga 1kg", kategoriya: "oziq", narxi: "20000", yetkazish: "1 kun", chegirmadagi: "", rasm: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500", tavsif: "Palov uchun mo'ljallangan saralangan Alanga guruchi." }
                ]);
                setLoading(false);
            });
    };

    const handleAuth = (u) => {
        setUser(u);
        try {
            localStorage.setItem("mr_shoping_user", JSON.stringify(u));
        } catch {

        }
    };

    const handleLogout = () => {
        setUser(null);
        try {
            localStorage.removeItem("mr_shoping_user");
        } catch {}
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.narxi) || 0) * item.quantity, 0);
    };

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        if (!checkoutData.name || !checkoutData.location) {
            alert("Iltimos, ism va lokatsiyani kiriting!");
            return;
        }
        setCart([]);
        setIsCheckoutSuccess(true);
        setTimeout(() => {
            setIsCheckoutSuccess(false);
            setIsCartOpen(false);
            setCheckoutData({ name: "", phone: "", location: "" });
        }, 3000);
    };

    const toggleFavorite = (id) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const filteredProducts = products.filter(
        (p) =>
            p.nomi.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (activeCategory === "" || p.kategoriya === activeCategory)
    );

    const favoriteProducts = products.filter((p) => favorites.includes(p.id));

    const NOTIFICATIONS = [
        { id: 1, title: "Buyurtmangiz yo'lda", desc: "Kuryer manzilingiz tomon yo'lga chiqdi.", time: "5 daqiqa oldin" },
        { id: 2, title: "Yangi chegirma", desc: "Oziq-ovqat toifasida yangi chegirmalar qo'shildi.", time: "1 soat oldin" },
        { id: 3, title: "Xush kelibsiz!", desc: "MR shoping'da birinchi buyurtmangizga omad tilaymiz.", time: "Kecha" }
    ];

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);


    if (!user) {
        return <AuthGate onAuth={handleAuth} />;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">

            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">

                    <button onClick={() => navigate("/home")} className="flex items-center gap-2.5 shrink-0 group">
                        <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-base shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                            MR
                        </span>
                        <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:inline">
                            shoping<span className="text-indigo-600">.</span>
                        </span>
                    </button>

                    <nav className="hidden lg:flex items-center gap-1 shrink-0">
                        <button onClick={() => navigate("/home  ")} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 px-3 py-2 rounded-xl transition-colors">
                            <HomeIcon className="w-4 h-4" /> Bosh sahifa
                        </button>
                        <button
                            onClick={() => {
                                setActiveCategory("");
                                document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 px-3 py-2 rounded-xl transition-colors"
                        >
                            <Grid3x3 className="w-4 h-4" /> Katalog
                        </button>
                        <button onClick={() => setIsContactOpen(true)} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 px-3 py-2 rounded-xl transition-colors">
                            <MessageCircle className="w-4 h-4" /> Aloqa
                        </button>
                    </nav>

                    <div className="flex-1 max-w-lg relative">
                        <input
                            type="text"
                            placeholder="Qidiruv: un, choy, guruch..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2.5 pl-4 pr-10 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder-slate-400 rounded-full text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-600 focus:shadow-sm"
                        />
                        <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => navigate("/admin")}
                            className="hidden md:flex items-center gap-2 text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Admin</span>
                        </button>

                        <div className="relative hidden sm:block">
                            <button
                                title="Bildirishnomalar"
                                onClick={() => {
                                    setIsNotificationsOpen((o) => !o);
                                }}
                                className="relative flex p-2.5 text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition-colors"
                            >
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                            </button>

                            {isNotificationsOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100 z-50 overflow-hidden">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <h4 className="text-sm font-bold text-slate-900">Bildirishnomalar</h4>
                                        </div>
                                        <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                                            {NOTIFICATIONS.map((n) => (
                                                <div key={n.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                                                    <p className="text-xs font-bold text-slate-800">{n.title}</p>
                                                    <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                     

                        <div className="hidden sm:flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 pl-3.5 pr-1.5 py-1.5 rounded-xl">
                            <span className="text-xs font-semibold text-indigo-600">{user.name}</span>
                            <button
                                onClick={handleLogout}
                                title="Chiqish"
                                className="p-1.5 text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-indigo-200 mb-4 border border-white/10">
                        ⚡ Tezkor va sifatli xizmat
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl leading-tight">
                        Uyingizga yetib boradigan zamonaviy bozor
                    </h1>
                    <p className="text-indigo-200 mt-4 max-w-lg text-sm sm:text-base leading-relaxed">
                        Kundalik ehtiyojlaringizni saralang, qolganini bizning tezkor yetkazib berish xizmatimizga qoldiring.
                    </p>
                </div>
            </div>

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 space-y-10">

                <section id="katalog">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.label}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`shrink-0 w-36 p-4 rounded-2xl text-left transition-all border ${
                                    activeCategory === cat.key
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100 scale-105"
                                        : "bg-white text-slate-800 border-slate-200 hover:border-indigo-300 hover:shadow-sm"
                                }`}
                            >
                                <div className="text-2xl mb-2">{cat.emoji}</div>
                                <h3 className="font-bold text-sm leading-tight">{cat.label}</h3>
                                <p className={`text-[11px] mt-1 ${activeCategory === cat.key ? "text-indigo-100" : "text-slate-400"}`}>
                                    {cat.sub}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Katalog</h2>
                            <p className="text-xs text-slate-400 mt-1">Sifatli va hamyonbop mahsulotlar</p>
                        </div>
                        <span className="text-xs font-semibold bg-slate-200/60 text-slate-600 px-3 py-1 rounded-full">
                            {filteredProducts.length} ta mahsulot
                        </span>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400 text-sm">
                            Mahsulot topilmadi. Boshqa kalit so'z bilan izlab ko'ring.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 flex flex-col group overflow-hidden"
                                >
                                    <div
                                        onClick={() => navigate(`/product/${item.id}`)}
                                        className="h-48 bg-slate-100 overflow-hidden cursor-pointer relative"
                                    >
                                        {item.chegirmadagi && (
                                            <DiscountTag>{item.chegirmadagi}</DiscountTag>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(item.id);
                                            }}
                                            title="Sevimlilarga qo'shish"
                                            className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition-colors ${
                                                favorites.includes(item.id) ? "bg-red-500 text-white" : "bg-white/90 text-slate-500 hover:text-red-500"
                                            }`}
                                        >
                                            <Heart className="w-3.5 h-3.5" fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                                        </button>
                                        <img
                                            src={item.rasm}
                                            alt={item.nomi}
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                                                <Info className="w-3.5 h-3.5 text-indigo-600" /> Batafsil
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2 mb-1">
                                                <h3
                                                    onClick={() => navigate(`/product/${item.id}`)}
                                                    className="text-sm font-bold text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-1"
                                                >
                                                    {item.nomi}
                                                </h3>
                                                <span
                                                    onClick={() => navigate(`/product/${item.id}`)}
                                                    className="text-[10px] text-slate-400 font-mono bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-1.5 py-0.5 rounded shrink-0 cursor-pointer transition-colors"
                                                >
                                                    #{item.id}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-teal-600 font-medium flex items-center gap-1">
                                                <Truck className="w-3.5 h-3.5" />
                                                <span>{item.yetkazish || "Standart"}</span>
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                            <div>
                                                <span className="text-[10px] text-slate-400 block font-medium">Narxi</span>
                                                <div className="text-base font-extrabold text-indigo-600">
                                                    {item.narxi} <span className="text-xs font-normal text-slate-500">so'm</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white p-2.5 rounded-xl shadow-md shadow-indigo-100 transition-all"
                                                title="Savatga olish"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            {isCartOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
                    <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-indigo-600" /> Savatingiz
                            </h3>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"><X className="w-4 h-4" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {isCheckoutSuccess ? (
                                <div className="text-center py-20 space-y-3">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                                    <h4 className="text-xl font-bold text-slate-900">Buyurtma qabul qilindi</h4>
                                    <p className="text-xs text-slate-500 max-w-xs mx-auto">Menejer ko'rsatilgan manzil bo'yicha siz bilan tez orada bog'lanadi.</p>
                                </div>
                            ) : cart.length === 0 ? (
                                <div className="text-center py-20 text-slate-400 text-sm">Savat hozircha bo'sh</div>
                            ) : (
                                <>
                                    <div className="space-y-3">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                                                <div>
                                                    <h4 className="font-bold text-xs text-slate-800">{item.nomi}</h4>
                                                    <p className="text-indigo-600 font-extrabold text-xs mt-0.5">{item.narxi} so'm</p>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-200">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-indigo-600 text-slate-500"><Minus className="w-3 h-3" /></button>
                                                    <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-indigo-600 text-slate-500"><Plus className="w-3 h-3" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <form onSubmit={handleCheckoutSubmit} className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Buyurtmachi ma'lumotlari</h4>
                                        <div>
                                            <label className="block text-[11px] text-slate-500 mb-1 font-medium">Ismingiz *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Masalan: Ali Valiyev"
                                                value={checkoutData.name}
                                                onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-slate-500 mb-1 font-medium flex items-center gap-1">
                                                <Phone className="w-3 h-3" /> Telefon raqam
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="+998 90 123 45 67"
                                                value={checkoutData.phone}
                                                onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-slate-500 mb-1 font-medium flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> Lokatsiya / Manzil *
                                            </label>
                                            <textarea
                                                required
                                                rows="2"
                                                placeholder="Toshkent sh., Yunusobod t., 4-mavze..."
                                                value={checkoutData.location}
                                                onChange={(e) => setCheckoutData({ ...checkoutData, location: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-600"
                                            />
                                        </div>

                                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-indigo-100 transition-all mt-2">
                                            Rasmiylashtirish — {calculateTotal()} so'm
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {isFavoritesOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
                    <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-500" /> Sevimlilar
                            </h3>
                            <button onClick={() => setIsFavoritesOpen(false)} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"><X className="w-4 h-4" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-3">
                            {favoriteProducts.length === 0 ? (
                                <div className="text-center py-20 text-slate-400 text-sm">
                                    Hozircha sevimlilar ro'yxati bo'sh.
                                </div>
                            ) : (
                                favoriteProducts.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                                        <img
                                            src={item.rasm}
                                            alt={item.nomi}
                                            onClick={() => {
                                                setIsFavoritesOpen(false);
                                                navigate(`/product/${item.id}`);
                                            }}
                                            className="w-14 h-14 rounded-xl object-cover cursor-pointer shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4
                                                onClick={() => {
                                                    setIsFavoritesOpen(false);
                                                    navigate(`/product/${item.id}`);
                                                }}
                                                className="font-bold text-xs text-slate-800 cursor-pointer hover:text-indigo-600 truncate"
                                            >
                                                {item.nomi}
                                            </h4>
                                            <p className="text-indigo-600 font-extrabold text-xs mt-0.5">{item.narxi} so'm</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                                onClick={() => addToCart(item)}
                                                title="Savatga olish"
                                                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => toggleFavorite(item.id)}
                                                title="Sevimlilardan olib tashlash"
                                                className="p-2 bg-white border border-slate-200 hover:border-red-300 text-red-500 rounded-xl transition-colors"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            {isContactOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => {
                                setIsContactOpen(false);
                                setIsContactSent(false);
                            }}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {isContactSent ? (
                            <div className="text-center py-6 space-y-3">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                                <h4 className="text-lg font-bold text-slate-900">Xabaringiz yuborildi</h4>
                                <p className="text-xs text-slate-500">Operatorimiz tez orada siz bilan bog'lanadi.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold text-slate-900 mb-1">Biz bilan bog'laning</h2>
                                <p className="text-xs text-slate-500 mb-5">Savolingiz bormi? Xabar qoldiring, tez orada javob beramiz.</p>

                                <div className="space-y-2.5 mb-5 text-xs text-slate-600">
                                    <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-indigo-500" /> +998 50 159 18 87</p>
                                    <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-indigo-500" /> Andijon, O'zbekiston</p>
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!contactData.name || !contactData.message) return;
                                        setIsContactSent(true);
                                        setTimeout(() => {
                                            setIsContactOpen(false);
                                            setIsContactSent(false);
                                            setContactData({ name: "", phone: "", message: "" });
                                        }, 2500);
                                    }}
                                    className="space-y-3"
                                >
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5 text-slate-600">Ismingiz *</label>
                                        <input
                                            type="text"
                                            required
                                            value={contactData.name}
                                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5 text-slate-600">Telefon raqam</label>
                                        <input
                                            type="text"
                                            placeholder="+998 90 123 45 67"
                                            value={contactData.phone}
                                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5 text-slate-600">Xabaringiz *</label>
                                        <textarea
                                            required
                                            rows="3"
                                            value={contactData.message}
                                            onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-indigo-100 transition-all">
                                        Yuborish
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
            <footer className="bg-slate-900 text-white border-t border-slate-800 mt-20">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                                    MR
                                </span>
                                <span className="font-bold text-lg">shoping</span>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                                Kundalik eng saralangan mahsulotlar, uyingizga tezkor va ishonchli yetkazib berish bilan.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-4 text-slate-200">Aloqa</h3>
                            <div className="space-y-2.5 text-xs text-slate-400">
                                <button onClick={() => setIsContactOpen(true)} className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 text-indigo-400" />
                                    +998 50 159 18 87
                                </button>
                                <p className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-indigo-400" />
                                    Andijon, O'zbekiston
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-4 text-slate-200">Kategoriyalar</h3>
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                                <button
                                    onClick={() => {
                                        setActiveCategory("oziq");
                                        document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-left hover:text-white cursor-pointer transition-colors"
                                >
                                    Oziq-ovqat
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveCategory("texnika");
                                        document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-left hover:text-white cursor-pointer transition-colors"
                                >
                                    Texnika
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveCategory("go'zallik");
                                        document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-left hover:text-white cursor-pointer transition-colors"
                                >
                                    Uy buyumlari
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveCategory("ichimlik");
                                        document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-left hover:text-white cursor-pointer transition-colors"
                                >
                                    Ichimliklar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-10 pt-6 text-center">
                        <p className="text-xs text-slate-500">
                            © 2026 MR shoping. Barcha huquqlar himoyalangan.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;