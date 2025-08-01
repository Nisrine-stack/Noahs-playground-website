document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Dropdown Menu Logic ---
    const header = document.getElementById('main-header');
    const menuContainer = document.getElementById('dropdown-menu');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const mainContent = document.getElementById('main-content');
    let activeTimeout;

    // --- RENDERER FOR PRODUCT CARDS ---
    function renderProductCard(product) {
        return `
            <div class="bg-blue-50/40 border border-gray-200 rounded-lg p-4 text-center">
                <div class="aspect-w-3 aspect-h-2 mb-4 rounded-lg overflow-hidden relative">
                   ${product.isBusiness ? `<span class="absolute top-2 left-2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold z-10">Business</span>` : ''}
                  <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                <h4 class="font-bold text-gray-900 mb-2 leading-tight">${product.name}</h4>
                <p class="text-sm text-gray-600 mb-3">${product.price}</p>
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2">Add to Cart</button>
            </div>
        `;
    }

    // --- DETAILED MENU DATA ---
    const menuData = {
        'Playgrounds': {
            html: `
                <div class="max-w-screen-2xl mx-auto px-6 py-8"><div class="grid grid-cols-12 gap-8">
                    <div class="col-span-3">
                        <h3 class="text-xl font-bold text-orange-500 mb-6">Playground Equipment</h3>
                        <div class="grid grid-cols-2 gap-x-4"><div class="space-y-4">
                            <h4 class="font-bold text-gray-800 mb-2">Playground Structures</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><a href__="#" class="hover:text-blue-600">Fitness Structures</a></li>
                                <li><a href__="#" class="hover:text-blue-600">Inclusive Playground Equipment</a></li>
                                <li><a href__="#" class="hover:text-blue-600">Indoor Playgrounds</a></li>
                                <li><a href__="#" class="hover:text-blue-600">Shaded Structures</a></li>
                            </ul>
                        </div><div class="space-y-4">
                            <h4 class="font-bold text-gray-800 mb-2">Massage Centers</h4>
                            <h4 class="font-bold text-gray-800 mb-2">Playhouses</h4>
                            <h4 class="font-bold text-gray-800 mb-2">Slides</h4>
                        </div></div>
                    </div>
                    <div class="col-span-9">
                        <div class="text-right mb-4"><a href__="#" class="text-sm text-blue-600 hover:text-blue-800 font-bold">View All Products</a></div>
                        <div class="grid grid-cols-3 gap-6">__PRODUCTS__</div>
                    </div>
                </div></div>`,
            products: [
                { name: "Bashful Bluff Structure", price: "$20,091.00", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", isBusiness: true },
                { name: "Denali Get Physical", price: "$19,152.00", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", isBusiness: false },
                { name: "Summit Adventure", price: "$22,500.00", image: "https://images.unsplash.com/photo-1541740242-0e60489f3c75?w=300&h=200&fit=crop", isBusiness: false }
            ]
        },
        'Swings': {
            html: `
                <div class="max-w-screen-2xl mx-auto px-6 py-8"><div class="grid grid-cols-12 gap-8">
                    <div class="col-span-4">
                        <h3 class="text-xl font-bold text-blue-500 mb-6">Swings</h3>
                        <div class="space-y-4">
                            <h4 class="font-bold text-gray-800 mb-3">Swing Sets</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><a href__="#" class="hover:text-blue-600">Adaptive Swings</a></li>
                                <li><a href__="#" class="hover:text-blue-600">Arch Post Swings</a></li>
                                <li><a href__="#" class="hover:text-blue-600">Single Post Swings</a></li>
                                <li><a href__="#" class="hover:text-blue-600">Tire & Nest Swings</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-span-8">
                        <div class="text-right mb-4"><a href__="#" class="text-sm text-blue-600 hover:text-blue-800 font-bold">View All Products</a></div>
                        <div class="grid grid-cols-2 gap-6">__PRODUCTS__</div>
                    </div>
                </div></div>`,
            products: [
                { name: "Adaptive Swing", price: "$2,094.00", image: "https://images.unsplash.com/photo-1599232230776-42dec1848235?w=300&h=200&fit=crop", isBusiness: false },
                { name: "Standard Swing Set", price: "$1,500.00", image: "https://images.unsplash.com/photo-1597791522294-282196683f8c?w=300&h=200&fit=crop", isBusiness: false }
            ]
        }
    };

    function showMenu(category) {
        clearTimeout(activeTimeout);
        const categoryData = menuData[category];
        if (categoryData) {
            let productsHTML = '';
            if (categoryData.products) {
                productsHTML = categoryData.products.map(renderProductCard).join('');
            }
            menuContainer.innerHTML = categoryData.html.replace('__PRODUCTS__', productsHTML);
            menuContainer.classList.add('active');
            
            categoryButtons.forEach(btn => {
                btn.classList.toggle('active-category', btn.dataset.category === category);
            });
        } else {
             menuContainer.innerHTML = `<div class="p-8 text-center"><h3 class="text-xl font-bold">${category} Products Coming Soon</h3></div>`;
             menuContainer.classList.add('active');
             categoryButtons.forEach(btn => {
                btn.classList.toggle('active-category', btn.dataset.category === category);
            });
        }
    }

    function hideMenu() {
        activeTimeout = setTimeout(() => {
            menuContainer.classList.remove('active');
            categoryButtons.forEach(btn => {
                btn.classList.remove('active-category');
            });
        }, 200);
    }
    
    categoryButtons.forEach(button => {
        button.addEventListener('mouseenter', () => showMenu(button.dataset.category));
    });

    header.addEventListener('mouseleave', hideMenu);
    mainContent.addEventListener('mouseenter', () => { // Hide menu when mouse enters main content
        clearTimeout(activeTimeout);
        menuContainer.classList.remove('active');
        categoryButtons.forEach(btn => {
             btn.classList.remove('active-category');
        });
    });

    // --- Projects Slider Logic ---
    const projects = [
        { title: "Westtown Twp, PA", subtitle: "Westtown Park", description: "Custom playground designed for ages 2-12 featuring inclusive play elements and modern safety standards.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop" },
        { title: "Phoenixville, PA", subtitle: "Phoenixville Park", description: "Award-winning community playground with natural elements and accessible design for all abilities.", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" },
        { title: "Westtown Twp, PA", subtitle: "Westtown Play Space", description: "Innovative playground combining traditional play with modern interactive elements and landscaping.", image: "https://images.unsplash.com/photo-1541740242-0e60489f3c75?w=400&h=300&fit=crop" }
    ];

    let currentProjectIndex = 0;
    const projectCard = document.getElementById('project-card');
    const projectDotsContainer = document.getElementById('project-dots');

    function renderProject(index) {
        if (!projectCard) return; // aafeguard if element doesn't exist
        const project = projects[index];
        projectCard.innerHTML = `
            <div class="aspect-video overflow-hidden"><img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover"></div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${project.title}</h3>
                <h4 class="text-lg text-blue-600 mb-3">${project.subtitle}</h4>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">View Project</button>
            </div>`;

        const dots = projectDotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('bg-blue-600', i === index);
            dots[i].classList.toggle('bg-gray-300', i !== index);
        }
    }

    if (projectCard) { // only run slider logic if the section exists
        projects.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full transition-colors';
            dot.addEventListener('click', () => { currentProjectIndex = index; renderProject(currentProjectIndex); });
            projectDotsContainer.appendChild(dot);
        });

        document.getElementById('next-project').addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
            renderProject(currentProjectIndex);
        });

        document.getElementById('prev-project').addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
            renderProject(currentProjectIndex);
        });
        
        renderProject(currentProjectIndex); // Initial render
    }
});