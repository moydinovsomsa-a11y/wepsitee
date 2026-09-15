import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutGrid,
    Package,
    PlusCircle,
    Trash2,
    Boxes,
    Receipt,
    Wallet,
    ArrowLeft,
    ImageOff,
} from "lucide-react";

function AdminPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const listRef = useRef(null);
    const formRef = useRef(null);

    const [newProduct, setNewProduct] = useState({
        nomi: "",
        narxi: "",
        yetkazish: "1 kun",
        chegirmadagi: "",
        rasm: "",
        tavsif: ""
    });

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
                        { id: 101, nomi: "Shakar 1kg", narxi: "14000", yetkazish: "Bugun", chegirmadagi: "-10%", rasm: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500", tavsif: "Oliy navli, mahalliy ishlab chiqarilgan toza shakar." },
                        { id: 102, nomi: "Suyuq sovun 500ml", narxi: "22000", yetkazish: "1 kun", chegirmadagi: "", rasm: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500", tavsif: "Teringizni muloyim tozalovchi va xushbo'y hid beruvchi suyuq sovun." }
                    ]);
                }
                setLoading(false);
            })
            .catch(() => {
                setProducts([
                    { id: 101, nomi: "O'simlik yog'i 1L", narxi: "18000", yetkazish: "Bugun", chegirmadagi: "-5%", rasm: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500", tavsif: "Tozalangan kungaboqar yog'i, pishiriq va taomlar uchun mos." },
                    { id: 102, nomi: "Guruch Alanga 1kg", narxi: "20000", yetkazish: "1 kun", chegirmadagi: "", rasm: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500", tavsif: "Palov uchun mo'ljallangan saralangan Alanga guruchi." }
                ]);
                setLoading(false);
            });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.nomi || !newProduct.narxi) return;

        const createdItem = {
            ...newProduct,
            id: Date.now(),
            rasm: newProduct.rasm || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
            tavsif: newProduct.tavsif || "Mahsulot haqida qo'shimcha ma'lumot mavjud emas."
        };

        setProducts([createdItem, ...products]);

        fetch("http://127.0.0.1:8000/api/rest/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createdItem)
        }).catch((err) => console.log("Mahsulot qo'shildi, ammo API xatosi:", err));

        setNewProduct({ nomi: "", narxi: "", yetkazish: "1 kun", chegirmadagi: "", rasm: "", tavsif: "" });
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
        fetch(`http://127.0.0.1:8000/api/rest/${id}/`, {
            method: "DELETE"
        }).catch((err) => console.log("O'chirishda xatolik:", err));
    };

    const scrollTo = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.narxi) || 0), 0);
    const discounted = products.filter((p) => p.chegirmadagi).length;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans">

            <aside className="hidden md:flex md:w-64 flex-col border-r border-slate-200 bg-white px-5 py-6 fixed h-screen justify-between z-20 shadow-sm">
                <div>
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-base shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                            MR
                        </span>
                        <div className="leading-tight">
                            <p className="text-sm font-bold text-slate-900">MR shoping</p>
                            <p className="text-xs text-slate-500 font-medium">Boshqaruv paneli</p>
                        </div>
                    </div>

                    <nav className="space-y-1.5">
                        <button
                            onClick={() => scrollTo(listRef)}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium bg-[#14532D]/10 text-[#14532D] transition-all"
                        >
                            <LayoutGrid className="w-4 h-4" />
                            <span>Umumiy holat</span>
                        </button>
                        <button
                            onClick={() => scrollTo(listRef)}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                        >
                            <Boxes className="w-4 h-4" />
                            <span>Mahsulotlar</span>
                        </button>
                        <button
                            onClick={() => scrollTo(formRef)}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Mahsulot qo'shish</span>
                        </button>
                    </nav>
                </div>

                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Do'konga qaytish</span>
                </button>
            </aside>

            <div className="flex-1 md:ml-64">

                <div className="md:hidden flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 py-3 sticky top-0 z-30">
                    <div className="flex items-center gap-2.5">
                        <span className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-base shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                            MR
                        </span>
                        <span className="text-sm font-bold text-slate-900">Boshqaruv paneli</span>
                    </div>
                    <button onClick={() => navigate("/home")} className="text-xs font-semibold text-[#14532D] flex items-center gap-1 bg-[#14532D]/10 px-3 py-1.5 rounded-lg">
                        <ArrowLeft className="w-3.5 h-3.5" /> Do'kon
                    </button>
                </div>

                <div className="px-4 sm:px-8 md:px-10 py-8 max-w-6xl mx-auto">

                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                            Bugun do'konda nima bo'lyapti
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Mahsulotlaringizni shu yerdan qo'shing, ko'rib chiqing va boshqaring.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 text-slate-500 mb-2">
                                <div className="p-2 bg-emerald-50 rounded-lg text-[#14532D]">
                                    <Package className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider">Jami mahsulotlar</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{products.length}</p>
                        </div>

                        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 text-slate-500 mb-2">
                                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                    <Receipt className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider">Chegirmadagi</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{discounted}</p>
                        </div>

                        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 text-slate-500 mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Wallet className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider">Katalog qiymati</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{totalValue.toLocaleString("uz-UZ")} so'm</p>
                        </div>
                    </div>
                    <div ref={listRef} className="bg-white border border-slate-200/80 rounded-2xl mb-8 shadow-sm overflow-hidden scroll-mt-6">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-sm font-bold text-slate-900">Mahsulotlar ro'yxati</h2>
                            <span className="text-xs font-semibold text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-full">{products.length} ta</span>
                        </div>

                        {loading ? (
                            <div className="py-16 flex justify-center">
                                <div className="w-7 h-7 border-2 border-[#14532D] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="py-16 text-center text-sm text-slate-400">
                                Hali mahsulot qo'shilmagan.
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {products.map((p) => (
                                    <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/80 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                                            {p.rasm ? (
                                                <img src={p.rasm} alt={p.nomi} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageOff className="w-5 h-5 text-slate-400" />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-slate-900 truncate">{p.nomi}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">Yetkazish: {p.yetkazish || "Standart"}</p>
                                        </div>

                                        {p.chegirmadagi && (
                                            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg shrink-0">
                                                {p.chegirmadagi}
                                            </span>
                                        )}

                                        <span className="text-sm font-bold text-slate-900 shrink-0 min-w-[90px] text-right">
                                            {p.narxi} so'm
                                        </span>

                                        <button
                                            onClick={() => handleDeleteProduct(p.id)}
                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shrink-0"
                                            title="O'chirish"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div ref={formRef} className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden scroll-mt-6">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-sm font-bold text-slate-900">Yangi mahsulot qo'shish</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Yulduzcha bilan belgilangan maydonlar to'ldirilishi shart.</p>
                        </div>

                        <form onSubmit={handleAddProduct} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mahsulot nomi *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Masalan: Olma"
                                    value={newProduct.nomi}
                                    onChange={(e) => setNewProduct({ ...newProduct, nomi: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition-all bg-slate-50/30 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Narxi (so'm) *</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Masalan: 12000"
                                    value={newProduct.narxi}
                                    onChange={(e) => setNewProduct({ ...newProduct, narxi: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition-all bg-slate-50/30 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Yetkazib berish vaqti</label>
                                <input
                                    type="text"
                                    placeholder="Masalan: 1 kun"
                                    value={newProduct.yetkazish}
                                    onChange={(e) => setNewProduct({ ...newProduct, yetkazish: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition-all bg-slate-50/30 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Chegirma (ixtiyoriy)</label>
                                <input
                                    type="text"
                                    placeholder="Masalan: -15%"
                                    value={newProduct.chegirmadagi}
                                    onChange={(e) => setNewProduct({ ...newProduct, chegirmadagi: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition-all bg-slate-50/30 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Rasm URL</label>
                                <input
                                    type="text"
                                    placeholder="https://images.unsplash.com/..."
                                    value={newProduct.rasm}
                                    onChange={(e) => setNewProduct({ ...newProduct, rasm: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition-all bg-slate-50/30 focus:bg-white"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tavsif</label>
                                <textarea
                                    rows="3"
                                    placeholder="Mahsulot haqida batafsil ma'lumot..."
                                    value={newProduct.tavsif}
                                    onChange={(e) => setNewProduct({ ...newProduct, tavsif: e.target.value })}
                                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition-all bg-slate-50/30 focus:bg-white resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="md:col-span-2 bg-[#14532D] hover:bg-[#0F3F22] active:scale-[0.99] text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-emerald-900/10 text-sm mt-2"
                            >
                                Mahsulotni saqlash
                            </button>
                        </form>
                    </div>

                    <p className="text-xs text-slate-400 text-center mt-12 mb-4">© 2026 MR shoping — boshqaruv paneli</p>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;