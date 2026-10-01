import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutGrid,
    Package,
    PlusCircle,
    Trash2,
    Receipt,
    Wallet,
    ArrowLeft,
    ImageOff,
    Edit3,
    Search,
    X,
    CheckCircle2,
    Layers,
    Sparkles,
    TrendingUp,
    Filter
} from "lucide-react";

function AdminPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("barchasi");
    
    // Modal va notification holatlari
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [toast, setToast] = useState(null);

    const initialFormState = {
        nomi: "",
        narxi: "",
        kategoriya: "Oziq-ovqat",
        zaxira: 10,
        yetkazish: "1 kun",
        chegirmadagi: "",
        rasm: "",
        tavsif: ""
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchProducts();
    }, []);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchProducts = () => {
        setLoading(true);
        fetch("http://127.0.0.1:8000/api/rest/")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts([
                        { id: 101, nomi: "Shakar 1kg", narxi: "14000", kategoriya: "Oziq-ovqat", zaxira: 45, yetkazish: "Bugun", chegirmadagi: "-10%", rasm: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500", tavsif: "Oliy navli, mahalliy ishlab chiqarilgan toza shakar." },
                        { id: 102, nomi: "Suyuq sovun 500ml", narxi: "22000", kategoriya: "Maishiy kimyo", zaxira: 20, yetkazish: "1 kun", chegirmadagi: "", rasm: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500", tavsif: "Teringizni muloyim tozalovchi va xushbo'y hid beruvchi suyuq sovun." },
                        { id: 103, nomi: "O'simlik yog'i 1L", narxi: "18000", kategoriya: "Oziq-ovqat", zaxira: 30, yetkazish: "Bugun", chegirmadagi: "-5%", rasm: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500", tavsif: "Tozalangan kungaboqar yog'i." }
                    ]);
                }
                setLoading(false);
            })
            .catch(() => {
                setProducts([
                    { id: 101, nomi: "O'simlik yog'i 1L", narxi: "18000", kategoriya: "Oziq-ovqat", zaxira: 30, yetkazish: "Bugun", chegirmadagi: "-5%", rasm: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500", tavsif: "Tozalangan kungaboqar yog'i, pishiriq va taomlar uchun mos." },
                    { id: 102, nomi: "Guruch Alanga 1kg", narxi: "20000", kategoriya: "Oziq-ovqat", zaxira: 15, yetkazish: "1 kun", chegirmadagi: "", rasm: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500", tavsif: "Palov uchun mo'ljallangan saralangan Alanga guruchi." }
                ]);
                setLoading(false);
            });
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingId(product.id);
            setFormData(product);
        } else {
            setEditingId(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData(initialFormState);
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        if (!formData.nomi || !formData.narxi) return;

        if (editingId) {
            const updatedProducts = products.map((p) =>
                p.id === editingId ? { ...formData, id: editingId } : p
            );
            setProducts(updatedProducts);

            fetch(`http://127.0.0.1:8000/api/rest/${editingId}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }).catch((err) => console.log("API error:", err));

            showToast("Mahsulot yangilandi!");
        } else {
            const createdItem = {
                ...formData,
                id: Date.now(),
                rasm: formData.rasm || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
                tavsif: formData.tavsif || "Ma'lumot mavjud emas."
            };

            setProducts([createdItem, ...products]);

            fetch("http://127.0.0.1:8000/api/rest/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createdItem)
            }).catch((err) => console.log("API error:", err));

            showToast("Yangi mahsulot saqlandi!");
        }

        handleCloseModal();
    };

    const handleDeleteProduct = (id) => {
        if (!window.confirm("Ushbu mahsulotni o'chirmoqchimisiz?")) return;

        setProducts(products.filter((p) => p.id !== id));
        fetch(`http://127.0.0.1:8000/api/rest/${id}/`, {
            method: "DELETE"
        }).catch((err) => console.log("API error:", err));

        showToast("Mahsulot o'chirildi", "danger");
    };

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.nomi.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "barchasi" || p.kategoriya === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.narxi) || 0), 0);
    const discounted = products.filter((p) => p.chegirmadagi).length;

    return (
        <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans flex flex-col md:flex-row">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border text-sm font-semibold transition-all animate-bounce ${
                    toast.type === "danger" 
                        ? "bg-rose-500/20 border-rose-500/30 text-rose-300" 
                        : "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                }`}>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Sidebar */}
            <aside className="w-full md:w-72 bg-[#0F172A]/80 border-b md:border-b-0 md:border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0 backdrop-blur-xl">
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-500/20 text-white">
                            MR
                        </div>
                        <div>
                            <h2 className="font-bold text-base tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                MR SHOPPING
                            </h2>
                            <p className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider">NextGen Control</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm transition-all">
                            <LayoutGrid className="w-4 h-4" />
                            <span>Boshqaruv Paneli</span>
                        </button>
                        <button 
                            onClick={() => handleOpenModal()} 
                            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700/50"
                        >
                            <PlusCircle className="w-4 h-4 text-emerald-400" />
                            <span>Yangi Mahsulot</span>
                        </button>
                    </nav>
                </div>

                <div className="mt-8 md:mt-0">
                    <button
                        onClick={() => navigate("/home")}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/60 hover:bg-slate-800 hover:text-white transition-all border border-slate-700/60 shadow-lg"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Do'konga Qaytish</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 p-4 sm:p-8 md:p-10 max-w-7xl mx-auto w-full">
                {/* Top Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-indigo-900/30 via-slate-900/40 to-slate-900/0 p-6 rounded-3xl border border-indigo-500/10 backdrop-blur-md">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">
                            <Sparkles className="w-4 h-4" />
                            <span>Boshqaruv Tizimi</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Mahsulotlar Katalogi
                        </h1>
                    </div>
                    
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/25 transition-all text-sm active:scale-95"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Mahsulot Qo'shish</span>
                    </button>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    <div className="bg-[#0F172A]/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
                        <div className="flex items-center gap-3 text-slate-400 mb-3">
                            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                                <Package className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">Jami Mahsulotlar</span>
                        </div>
                        <p className="text-3xl font-black text-white">{products.length} <span className="text-xs font-normal text-slate-400">ta</span></p>
                    </div>

                    <div className="bg-[#0F172A]/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
                        <div className="flex items-center gap-3 text-slate-400 mb-3">
                            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                                <Receipt className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">Chegirmadagilar</span>
                        </div>
                        <p className="text-3xl font-black text-white">{discounted} <span className="text-xs font-normal text-slate-400">ta</span></p>
                    </div>

                    <div className="bg-[#0F172A]/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
                        <div className="flex items-center gap-3 text-slate-400 mb-3">
                            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">Umumiy Qiymat</span>
                        </div>
                        <p className="text-3xl font-black text-white">{totalValue.toLocaleString("uz-UZ")} <span className="text-xs font-normal text-slate-400">so'm</span></p>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-[#0F172A]/60 border border-slate-800/80 rounded-2xl p-4 mb-6 backdrop-blur-xl flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                            type="text"
                            placeholder="Qidiruv..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/60 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 text-slate-500 hover:text-slate-300">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <Filter className="w-4 h-4 text-slate-500 hidden sm:block ml-2" />
                        {["barchasi", "Oziq-ovqat", "Maishiy kimyo", "Ichimliklar"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
                                    selectedCategory === cat
                                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20"
                                        : "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid View */}
                {loading ? (
                    <div className="py-20 flex justify-center">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-20 text-center bg-[#0F172A]/40 border border-slate-800/80 rounded-2xl">
                        <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">Mahsulotlar topilmadi.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredProducts.map((p) => (
                            <div key={p.id} className="bg-[#0F172A]/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group backdrop-blur-xl">
                                <div>
                                    <div className="h-48 w-full bg-slate-900 relative overflow-hidden">
                                        {p.rasm ? (
                                            <img src={p.rasm} alt={p.nomi} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                                <ImageOff className="w-8 h-8" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

                                        {p.chegirmadagi && (
                                            <span className="absolute top-3 left-3 bg-rose-500/90 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-lg border border-rose-400/30">
                                                {p.chegirmadagi}
                                            </span>
                                        )}

                                        <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-indigo-300 font-bold text-xs px-2.5 py-1 rounded-lg">
                                            {p.kategoriya || "Boshqa"}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-bold text-base text-white truncate">{p.nomi}</h3>
                                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.tavsif || "Tavsif berilmagan."}</p>

                                        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                                            <span>Yetkazish: <b className="text-slate-200">{p.yetkazish || "Standart"}</b></span>
                                            <span>Zaxira: <b className="text-slate-200">{p.zaxira ?? 0} ta</b></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-5 pb-5 pt-2 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Narxi</span>
                                        <span className="text-lg font-black text-indigo-400">
                                            {parseFloat(p.narxi).toLocaleString("uz-UZ")} so'm
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenModal(p)}
                                            className="p-2.5 bg-slate-800/80 hover:bg-indigo-600/20 hover:text-indigo-400 text-slate-400 rounded-xl transition-all border border-slate-700/60"
                                            title="Tahrirlash"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(p.id)}
                                            className="p-2.5 bg-slate-800/80 hover:bg-rose-600/20 hover:text-rose-400 text-slate-400 rounded-xl transition-all border border-slate-700/60"
                                            title="O'chirish"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
                    <div className="bg-[#0F172A] border border-slate-800 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative">
                        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-white">
                                {editingId ? "Mahsulotni Tahrirlash" : "Yangi Mahsulot Qo'shish"}
                            </h3>
                            <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/50">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProduct} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Mahsulot Nomi *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nomi}
                                    onChange={(e) => setFormData({ ...formData, nomi: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Narxi (so'm) *</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.narxi}
                                    onChange={(e) => setFormData({ ...formData, narxi: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Kategoriya</label>
                                <select
                                    value={formData.kategoriya}
                                    onChange={(e) => setFormData({ ...formData, kategoriya: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white outline-none focus:border-indigo-500"
                                >
                                    <option value="Oziq-ovqat">Oziq-ovqat</option>
                                    <option value="Maishiy kimyo">Maishiy kimyo</option>
                                    <option value="Ichimliklar">Ichimliklar</option>
                                    <option value="Boshqa">Boshqa</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Ombor Zaxirasi</label>
                                <input
                                    type="number"
                                    value={formData.zaxira}
                                    onChange={(e) => setFormData({ ...formData, zaxira: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Yetkazib Berish</label>
                                <input
                                    type="text"
                                    value={formData.yetkazish}
                                    onChange={(e) => setFormData({ ...formData, yetkazish: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Chegirma</label>
                                <input
                                    type="text"
                                    placeholder="-10%"
                                    value={formData.chegirmadagi}
                                    onChange={(e) => setFormData({ ...formData, chegirmadagi: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Rasm URL</label>
                                <input
                                    type="text"
                                    value={formData.rasm}
                                    onChange={(e) => setFormData({ ...formData, rasm: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Tavsif</label>
                                <textarea
                                    rows="3"
                                    value={formData.tavsif}
                                    onChange={(e) => setFormData({ ...formData, tavsif: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white outline-none focus:border-indigo-500 resize-none"
                                />
                            </div>

                            <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-800 hover:text-white"
                                >
                                    Bekor Qilish
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
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

export default AdminPage;