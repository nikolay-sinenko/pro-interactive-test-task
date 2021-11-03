const express = require('express');
const router = express.Router();

class NewsEntry {
    constructor(id) {
        this.id = id;
        this.timestamp = Date.now();
        this.category = 'Услуги';
        this.title = `Новость #${id}`;
        this.cover = '/assets/uploads/news-cover.webp';
        this.annotation =
            'У нас есть широчайший ассортимент фотобудок на все случаи жизни';
    }
}

class NewsEntryExtended extends NewsEntry {
    constructor(id) {
        super(id);
        this.text =
            'Lorem ipsum dolor sit amet, consectetur [adipiscing elit](/), sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        this.images = Array.from(
            { length: 5 },
            _ => '/assets/uploads/news-gallery-photo.webp'
        );
    }
}

const news = Array.from({ length: 8 }, (_, index) => new NewsEntry(index + 1));

router.get('/', (req, res) => {
    const start = Number(req.query.start) - 1 || 0;
    const offset = Number(req.query.offset) || 3;
    const next = start + offset + 1;

    res.json({
        news: news.slice(start, start + offset),
        next: next < news.length ? next : null,
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const data = new NewsEntryExtended(Number(id));
    res.json(data);
});

module.exports = router;
