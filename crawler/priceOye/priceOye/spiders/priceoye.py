import scrapy

class PriceOyeSpider(scrapy.Spider):
    name = 'priceoye'
    start_urls = ['https://priceoye.pk']
    current_category = ''


    def parse(self, response):
        for link in response.xpath("//div[@class='sb-all-category']/amp-accordion[1]/section/ul/li"):
            currentCategory = link.xpath('.//a/text()')[0].get()
            yield response.follow(link.xpath(".//a/@href")[0], callback=self.crawl_product, meta={'current_category': currentCategory})

    def crawl_product(self, response):
        for pg in response.xpath("//div[@id='content']/div[@class='product-container']/div/section/div[@class='product-list']/div"):
            product_url = pg.xpath(".//a/@href")[0].get()
            productSmallImg = pg.xpath(".//a/div/amp-img/@src")[0].get()
            currentprice = pg.xpath(".//a/div[2]//div/text()")[0].get()
            yield response.follow(pg.xpath('.//a/@href')[0], callback=self.parse_des, meta={'productSmallImg':productSmallImg,'product_url': product_url,'current_price':currentprice ,'current_category': response.meta.get('current_category')})


        next_page = response.xpath("//div[@class='pagination']/a[@rel='next']/@href").get()
        if next_page is not None:
        # if PriceOyeSpider.page_number is not None:
            yield response.follow(next_page, callback=self.crawl_product, meta={'productSmallImg':response.meta.get('productSmallImg'),'current_price':response.meta.get('current_price'),'current_category': response.meta.get('current_category')})


    def parse_des(self, response):
        def price(changeToNum):
            price = response.meta.get(changeToNum)
            price = price.replace('Rs.', '')
            price = price.replace(',', '')
            price = int(price)
            return price

        yield {
            'heading': response.xpath("//section[@class='product-section container card']/div/div[@class='product-title']/h2/text()").get(),
            'price': price('current_price'),
            'product_url': response.meta.get("product_url"),
            'productSmallImg': response.meta.get("productSmallImg"),
            # 'productLargeImg': response.xpath("//section[@class ='product-section container card']/div[2]/div/div[2]//div/div/amp-carousel/div/amp-img/@src").get(),
            'description': response.xpath("//section[@class='product-section container card']/div[@class='row card']/div[@id='product-bullet']").get(),
            'category': response.meta.get('current_category'),
            'seller_key': 'priceoye',
            'seller_keyID': 8,
            'type': 50
        }

