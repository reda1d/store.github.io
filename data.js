const products = [
    {
        id: 1,
        title: {
            fr: "Humidificateur USB 180ML  Voiture & Maison",
            ar: "ساعة أنيقة بسيمرطب هواء USB 180 مل للسيارة والمنزلطة"
        },
        price: 1800,
        image: "images/Humidificateur1.png",
        description: {
            fr: "Mini Humidificateur d'Air USB 180ML  Diffuseur d'Arômes pour Voiture & Maison.",
            ar: "حوّل أجواء سيارتك أو منزلك إلى مساحة منعشة ومريحة مع مرطب الهواء USB سعة 180 مل. يوفر رذاذًا ناعمًا يساعد على ترطيب الهواء، مع إضاءة LED متعددة الألوان تضفي لمسة عصرية وأجواء هادئة. يتميز بتصميم صغير وأنيق، ويعمل بهدوء تام عبر منفذ USB، مما يجعله مثاليًا للاستخدام في السيارة، غرفة النوم، المكتب أو المنزل."
        }
    },
    {
        id: 2,
        title: {
            fr: "Écouteurs Sans Fil Pro",
            ar: "سماعات لاسلكية برو"
        },
        price: 6000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: {
            fr: "Son haute qualité avec annulation de bruit active. Jusqu'à 24h d'autonomie avec le boîtier.",
            ar: "صوت عالي الجودة مع إلغاء الضوضاء النشط. حتى 24 ساعة من البطارية مع العلبة."
        }
    },
    {
        id: 3,
        title: {
            fr: "Multifunctional Car Emergency Jump Starter High-Capacity PC+ABS Vehicle-Mounted Starter Battery Booster",
            ar: "مصدر طاقة عالي الجودة لبدء التشغيل في حالات الطوارئ، جهاز بدء التشغيل في حالات الطوارئ 12 فولت، معدات شحن البطارية، طاقة خارجية (موديل 29B)"
        },
        price: 8900,
        image: "images/HighpowerKL037.jpg",
        description: {
            fr: "Multifunctional Car Emergency Jump Starter High-Capacity PC+ABS Vehicle-Mounted Starter Battery Booster",
            ar:  "مصدر طاقة عالي الجودة لبدء التشغيل في حالات الطوارئ، جهاز بدء التشغيل في حالات الطوارئ 12 فولت، معدات شحن البطارية، طاقة خارجية (موديل 29B)"
        }
    },
    {
        id: 4,
        title: {
            fr: "Lunettes de Soleil Vintage",
            ar: "نظارات شمسية كلاسيكية"
        },
        price: 2500,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: {
            fr: "Protection UV400, monture légère et résistante. Un style intemporel.",
            ar: "حماية UV400، إطار خفيف ومقاوم. أسلوب خالد."
        }
    }
];

const wilayas = [
    { id: 1, name: "Adrar", zone: 3 },
    { id: 2, name: "Chlef", zone: 1 },
    { id: 3, name: "Laghouat", zone: 2 },
    { id: 4, name: "Oum El Bouaghi", zone: 2 },
    { id: 5, name: "Batna", zone: 2 },
    { id: 6, name: "Béjaïa", zone: 1 },
    { id: 7, name: "Biskra", zone: 2 },
    { id: 8, name: "Béchar", zone: 3 },
    { id: 9, name: "Blida", zone: 1 },
    { id: 10, name: "Bouira", zone: 1 },
    { id: 11, name: "Tamanrasset", zone: 3 },
    { id: 12, name: "Tébessa", zone: 2 },
    { id: 13, name: "Tlemcen", zone: 1 },
    { id: 14, name: "Tiaret", zone: 1 },
    { id: 15, name: "Tizi Ouzou", zone: 1 },
    { id: 16, name: "Alger", zone: 1 },
    { id: 17, name: "Djelfa", zone: 2 },
    { id: 18, name: "Jijel", zone: 1 },
    { id: 19, name: "Sétif", zone: 1 },
    { id: 20, name: "Saïda", zone: 1 },
    { id: 21, name: "Skikda", zone: 1 },
    { id: 22, name: "Sidi Bel Abbès", zone: 1 },
    { id: 23, name: "Annaba", zone: 1 },
    { id: 24, name: "Guelma", zone: 1 },
    { id: 25, name: "Constantine", zone: 1 },
    { id: 26, name: "Médéa", zone: 2 },
    { id: 27, name: "Mostaganem", zone: 1 },
    { id: 28, name: "M'Sila", zone: 2 },
    { id: 29, name: "Mascara", zone: 1 },
    { id: 30, name: "Ouargla", zone: 3 },
    { id: 31, name: "Oran", zone: 1 },
    { id: 32, name: "El Bayadh", zone: 2 },
    { id: 33, name: "Illizi", zone: 3 },
    { id: 34, name: "Bordj Bou Arréridj", zone: 1 },
    { id: 35, name: "Boumerdès", zone: 1 },
    { id: 36, name: "El Tarf", zone: 1 },
    { id: 37, name: "Tindouf", zone: 3 },
    { id: 38, name: "Tissemsilt", zone: 2 },
    { id: 39, name: "El Oued", zone: 3 },
    { id: 40, name: "Khenchela", zone: 2 },
    { id: 41, name: "Souk Ahras", zone: 2 },
    { id: 42, name: "Tipaza", zone: 1 },
    { id: 43, name: "Mila", zone: 1 },
    { id: 44, name: "Aïn Defla", zone: 1 },
    { id: 45, name: "Naâma", zone: 2 },
    { id: 46, name: "Aïn Témouchent", zone: 1 },
    { id: 47, name: "Ghardaïa", zone: 2 },
    { id: 48, name: "Relizane", zone: 1 },
    { id: 49, name: "Timimoun", zone: 3 },
    { id: 50, name: "Bordj Badji Mokhtar", zone: 3 },
    { id: 51, name: "Ouled Djellal", zone: 2 },
    { id: 52, name: "Béni Abbès", zone: 3 },
    { id: 53, name: "In Salah", zone: 3 },
    { id: 54, name: "In Guezzam", zone: 3 },
    { id: 55, name: "Touggourt", zone: 2 },
    { id: 56, name: "Djanet", zone: 3 },
    { id: 57, name: "El M'Ghair", zone: 2 },
    { id: 58, name: "El Meniaa", zone: 3 }
];

const shippingCosts = {
    1: 400,
    2: 600,
    3: 1000
};

const translations = {
    fr: {
        home: "Accueil",
        shop: "Boutique",
        about: "À propos",
        delivery: "Livraison",
        contact: "Contact",
        announcementCOD: "Paiement à la livraison",
        announcementDelivery: "Livraison dans les 58 wilayas d'Algérie",
        addToCart: "Ajouter au panier",
        viewProduct: "Voir le produit",
        bestSellers: "Meilleures Ventes",
        benefits: {
            title: "Pourquoi nous choisir ?",
            b1: "Livraison dans les 58 wilayas",
            b2: "Paiement à la livraison",
            b3: "Livraison rapide",
            b4: "Service client réactif"
        },
        reviews: {
            title: "Avis Clients",
            r1: "Excellent produit et livraison très rapide !",
            r2: "Je recommande cette boutique. Le paiement à la livraison est très pratique.",
            r3: "Qualité supérieure, service client au top."
        },
        checkout: {
            title: "Finaliser la commande",
            sectionDelivery: "Informations de livraison",
            firstName: "Prénom",
            lastName: "Nom",
            phone: "Téléphone",
            address: "Adresse",
            commune: "Commune",
            wilaya: "Wilaya",
            selectWilaya: "Sélectionnez votre wilaya...",
            orderSummary: "Votre commande",
            subtotal: "Sous-total",
            shipping: "Livraison",
            total: "Total",
            paymentMethod: "Mode de paiement",
            cod: "Paiement à la livraison",
            codSecure: "✔ Paiement sécurisé à la livraison",
            submitOrder: "Confirmer la commande",
            requiredField: "Ce champ est requis",
            emptyCart: "Votre panier est vide.",
            successTitle: "Commande réussie !",
            successMessage: "Merci pour votre achat. Nous vous contacterons bientôt pour confirmer la livraison.",
            continueShopping: "Continuer vos achats"
        },
        hero: {
            title: "Nouveautés Premium",
            subtitle: "Découvrez nos produits exclusifs de haute qualité avec paiement à la livraison.",
            cta: "Acheter maintenant"
        },
        currency: "DA",
        quantity: "Quantité",
        faq: {
            title: "Foire Aux Questions",
            q1: "Combien de temps prend la livraison ?",
            a1: "La livraison prend généralement de 2 à 5 jours selon votre wilaya.",
            q2: "Puis-je ouvrir le colis avant de payer ?",
            a2: "Oui, nous vous encourageons à vérifier votre commande avant de payer le livreur."
        },
        footer: {
            contact: "Informations de contact",
            terms: "Conditions Générales",
            privacy: "Politique de confidentialité",
            newsletter: "Abonnez-vous à notre newsletter",
            subscribe: "S'abonner"
        }
    },
    ar: {
        home: "الرئيسية",
        shop: "المتجر",
        about: "حول",
        delivery: "التوصيل",
        contact: "اتصل بنا",
        announcementCOD: "الدفع عند الاستلام",
        announcementDelivery: "التوصيل إلى 58 ولاية جزائرية",
        addToCart: "أضف إلى السلة",
        viewProduct: "عرض المنتج",
        bestSellers: "الأكثر مبيعاً",
        benefits: {
            title: "لماذا تختارنا؟",
            b1: "التوصيل إلى 58 ولاية",
            b2: "الدفع عند الاستلام",
            b3: "توصيل سريع",
            b4: "خدمة عملاء سريعة الاستجابة"
        },
        reviews: {
            title: "آراء العملاء",
            r1: "منتج ممتاز وتوصيل سريع جداً!",
            r2: "أوصي بهذا المتجر. الدفع عند الاستلام مريح جداً.",
            r3: "جودة عالية وخدمة عملاء رائعة."
        },
        checkout: {
            title: "إتمام الطلب",
            sectionDelivery: "معلومات التوصيل",
            firstName: "الاسم",
            lastName: "اللقب",
            phone: "رقم الهاتف",
            address: "العنوان",
            commune: "البلدية",
            wilaya: "الولاية",
            selectWilaya: "اختر ولايتك...",
            orderSummary: "طلبك",
            subtotal: "المجموع الفرعي",
            shipping: "التوصيل",
            total: "المجموع",
            paymentMethod: "طريقة الدفع",
            cod: "الدفع عند الاستلام",
            codSecure: "✔ دفع آمن عند الاستلام",
            submitOrder: "تأكيد الطلب",
            requiredField: "هذا الحقل مطلوب",
            emptyCart: "سلة التسوق فارغة.",
            successTitle: "تم الطلب بنجاح!",
            successMessage: "شكراً لشرائك. سنتصل بك قريباً لتأكيد التوصيل.",
            continueShopping: "مواصلة التسوق"
        },
        hero: {
            title: "التشكيلة الجديدة",
            subtitle: "اكتشف منتجاتنا الحصرية عالية الجودة مع الدفع عند الاستلام.",
            cta: "تسوق الآن"
        },
        currency: "دج",
        quantity: "الكمية",
        faq: {
            title: "أسئلة مكررة",
            q1: "كم يستغرق التوصيل؟",
            a1: "يستغرق التوصيل عادة من 2 إلى 5 أيام حسب ولايتك.",
            q2: "هل يمكنني فتح الطرد قبل الدفع؟",
            a2: "نعم، نشجعك على التحقق من طلبك قبل الدفع لعامل التوصيل."
        },
        footer: {
            contact: "معلومات الاتصال",
            terms: "الشروط والأحكام",
            privacy: "سياسة الخصوصية",
            newsletter: "اشترك في النشرة الإخبارية",
            subscribe: "اشترك"
        }
    }
};
