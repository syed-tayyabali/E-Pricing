import scrapy

class TabletSpider(scrapy.Spider):
    name = 'tablet'
    start_urls = [
        'http://www.tablets.pk/'
    ]

    def parse(self, response):
        i = 0
        for li in response.xpath("//div[@class='fixed smallmenu']/ul/li"):
            i = i+1
            if i > 2:
                yield response.follow(li.xpath(".//a/@href")[0], callback=self.crawl_product )

    def crawl_product(self, response):
        for pg in response.xpath("//div[@id='wrapper']/section[2]/section/figure/div/div[@class='tablets-holder']/div[@class='tablet-box']"):
            currentCategory = pg.xpath(".//a/h3/text()").get()
            product_url = pg.xpath(".//a/@href").get()
            productSmallImg = pg.xpath(".//div[2]/a/img/@src").get()
            yield response.follow(pg.xpath(".//a/@href")[0], callback=self.product_details,meta={'product_url': product_url, 'productSmallImg': productSmallImg,'current_category':currentCategory})

    def product_details(self, response):
        def price(change):
            price = response.xpath(change).get()
            price = int(price)
            return price
        
        web_url = 'www.tablets.pk'
        category1 = response.meta.get('current_category')
        category1 = category1.split(" ")

        yield{
            'heading': response.xpath("//div[@id='wrapper']/section[2]/section[1]/figure[1]/div/h1/text()").get(),
            'product_url': web_url+response.meta.get("product_url"),
            'productSmallImg': web_url+response.meta.get("productSmallImg"),
            # 'productLargeImg': response.xpath("//div[@id='wrapper']//div/div/div/img/@src").get(),
            'price': price("//div[@id='wrapper']/section[2]/section[1]/figure[1]/div/div/div[2]/div/div/h3/span[2]/font/text()"),
            'description': response.xpath("//div[@id='wrapper']/section[2]/section[1]/figure[1]/div/div/div[2]/ul[1]").get(),
            'overview': response.xpath("//div[@id='wrapper']/section[2]/section[1]/figure[1]/div[1]/article/div[1]/ul").get(),
            'category': category1[0],
            'seller_key': 'tablet',
            'seller_keyID': 7,
            'type': 75
        }



