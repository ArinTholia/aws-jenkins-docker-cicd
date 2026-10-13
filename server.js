const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_DIR = path.join(__dirname, 'data');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Initialize Default Cafe Menu & Sample Orders
function initDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(MENU_FILE)) {
    const initialMenu = [
      {
        id: 'item-1',
        name: 'Farmhouse Cheese Burst Pizza',
        category: 'Pizza & Burgers',
        price: 299,
        rating: '4.9',
        prepTime: '15 mins',
        emoji: '🍕',
        badge: 'Bestseller',
        desc: 'Fresh mozzarella, bell peppers, sweet corn & Italian herbs on a crispy crust.'
      },
      {
        id: 'item-2',
        name: 'Crispy Peri-Peri Veg Burger',
        category: 'Pizza & Burgers',
        price: 169,
        rating: '4.8',
        prepTime: '10 mins',
        emoji: '🍔',
        badge: 'Chef Special',
        desc: 'Crunchy herb patty topped with spicy peri-peri mayo, cheddar slice & lettuce.'
      },
      {
        id: 'item-3',
        name: 'Iced Caramel Cold Brew Latte',
        category: 'Coffee & Drinks',
        price: 149,
        rating: '4.9',
        prepTime: '5 mins',
        emoji: '🧋',
        badge: 'Must Try',
        desc: '100% Arabica espresso blended with chilled milk and rich salted caramel.'
      },
      {
        id: 'item-4',
        name: 'Hot Hazelnut Cappuccino',
        category: 'Coffee & Drinks',
        price: 129,
        rating: '4.7',
        prepTime: '5 mins',
        emoji: '☕',
        badge: 'Popular',
        desc: 'Velvety steamed milk foam poured over freshly roasted hazelnut espresso.'
      },
      {
        id: 'item-5',
        name: 'Belgian Chocolate Lava Cake',
        category: 'Desserts',
        price: 139,
        rating: '5.0',
        prepTime: '8 mins',
        emoji: '🍰',
        badge: 'Sweet Treat',
        desc: 'Warm dark chocolate cake with a gooey molten chocolate center & vanilla scoop.'
      },
      {
        id: 'item-6',
        name: 'Loaded Cheesy Masala Fries',
        category: 'Snacks',
        price: 119,
        rating: '4.8',
        prepTime: '7 mins',
        emoji: '🍟',
        badge: 'Crispy',
        desc: 'Golden French fries drizzled with liquid jalapeno cheese and tangy spices.'
      }
    ];
    fs.writeFileSync(MENU_FILE, JSON.stringify(initialMenu, null, 2));
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    const initialOrders = [
      {
        id: 'ORD-101',
        itemName: 'Farmhouse Cheese Burst Pizza',
        emoji: '🍕',
        price: 299,
        customerName: 'Rahul (Table #4)',
        status: 'Preparing',
        orderedAt: 'Just now'
      },
      {
        id: 'ORD-102',
        itemName: 'Iced Caramel Cold Brew Latte',
        emoji: '🧋',
        price: 149,
        customerName: 'Priya (Online Order)',
        status: 'Out for Delivery',
        orderedAt: '5 mins ago'
      }
    ];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2));
  }
}

initDataStore();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ============================================================================
// 1. HEALTH CHECK & BUILD INFO (Used by Jenkins & Docker)
// ============================================================================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'cloudbite-cafe-cicd',
    buildNumber: process.env.BUILD_NUMBER || '1',
    gitCommit: (process.env.GIT_COMMIT || 'main').substring(0, 7),
    containerId: os.hostname()
  });
});

app.get('/api/build-info', (req, res) => {
  res.json({
    appName: 'CloudBite Cafe',
    buildNumber: process.env.BUILD_NUMBER || '1',
    gitCommit: (process.env.GIT_COMMIT || '7f3a9c1').substring(0, 7),
    containerId: os.hostname().substring(0, 12),
    cloudProvider: process.env.CLOUD_PROVIDER || 'AWS Cloud (EC2)',
    tools: ['AWS Cloud (EC2)', 'Git & GitHub', 'Jenkins CI/CD', 'Docker']
  });
});

// ============================================================================
// 2. CAFE MENU API (Browse & Add New Dishes Dynamically)
// ============================================================================
app.get('/api/menu', (req, res) => {
  const menu = readJson(MENU_FILE);
  res.json(menu);
});

app.post('/api/menu', (req, res) => {
  const { name, category, price, emoji, desc } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Dish name is required' });
  }

  const menu = readJson(MENU_FILE);
  const newDish = {
    id: `item-${Date.now()}`,
    name: name.trim(),
    category: category || 'Pizza & Burgers',
    price: Number(price) || 149,
    rating: '4.9',
    prepTime: '12 mins',
    emoji: emoji || '🍽️',
    badge: 'New Arrival',
    desc: desc && desc.trim() ? desc.trim() : 'Freshly prepared signature dish added to our live menu.'
  };

  menu.unshift(newDish);
  writeJson(MENU_FILE, menu);
  res.status(201).json(newDish);
});

app.delete('/api/menu/:id', (req, res) => {
  const menu = readJson(MENU_FILE);
  const filtered = menu.filter(item => item.id !== req.params.id);
  writeJson(MENU_FILE, filtered);
  res.json({ deleted: true });
});

// ============================================================================
// 3. 1-CLICK LIVE ORDERS API (Place Order, Update Status, Cancel)
// ============================================================================
app.get('/api/orders', (req, res) => {
  const orders = readJson(ORDERS_FILE);
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.price || 0), 0);
  res.json({
    orders,
    stats: {
      totalOrders: orders.length,
      preparing: orders.filter(o => o.status === 'Preparing').length,
      delivered: orders.filter(o => o.status === 'Delivered').length,
      totalRevenue
    }
  });
});

app.post('/api/orders', (req, res) => {
  const { itemName, emoji, price, customerName } = req.body;
  if (!itemName) {
    return res.status(400).json({ error: 'Item name is required' });
  }

  const orders = readJson(ORDERS_FILE);
  const randomOrderNum = Math.floor(100 + Math.random() * 900);
  const newOrder = {
    id: `ORD-${randomOrderNum}`,
    itemName,
    emoji: emoji || '🍔',
    price: Number(price) || 149,
    customerName: customerName && customerName.trim() ? customerName.trim() : 'Walk-in Customer',
    status: 'Preparing',
    orderedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  orders.unshift(newOrder);
  writeJson(ORDERS_FILE, orders);
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id', (req, res) => {
  const orders = readJson(ORDERS_FILE);
  const idx = orders.findIndex(o => o.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  orders[idx].status = req.body.status || 'Delivered';
  writeJson(ORDERS_FILE, orders);
  res.json(orders[idx]);
});

app.delete('/api/orders/:id', (req, res) => {
  const orders = readJson(ORDERS_FILE);
  const filtered = orders.filter(o => o.id !== req.params.id);
  writeJson(ORDERS_FILE, filtered);
  res.json({ deleted: true });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================================`);
    console.log(`🍔 CloudBite Cafe Website running on http://localhost:${PORT}`);
    console.log(`========================================================`);
  });
}

module.exports = app;
