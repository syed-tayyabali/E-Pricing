import scrapy

class WhatPriceSpider(scrapy.Spider):
    name = 'whatprice'
    start_urls = [
        'http://www.whatprice.com.pk/index.php/mobile-phones'
    ]
    product_url = ''
    productSmallImg = ''

    def parse(self, response):
        for li in response.xpath("//div[@class='tm-page-bg']/div/div/section/div/div[1]/div/div"):
            currentCategory = li.xpath(".//a/@href")[0].get()
            # print(li.xpath(".//a/@href").get());
            yield response.follow(li.xpath(".//a/@href")[0], callback=self.crawl_product, meta = {'current_category':currentCategory})

    def crawl_product(self, response):
        for li in response.xpath("//div[@class='tm-page-bg']/div[1]/div[1]/div[3]/div[1]/main/div[2]/div[@class='uk-grid']/div/div/div"):
            product_url = li.xpath(".//a/@href").get()
            productSmallImg = li.xpath(".//a/img/@src").get()
            yield response.follow(li.xpath(".//a/@href")[0], callback=self.parse_des, meta = {'product_url': product_url, 'productSmallImg': productSmallImg,'current_category': response.meta.get('current_category')})

    def parse_des(self, response):
        web_url = 'http://www.whatprice.com.pk'
        category = response.meta.get('current_category')
        category = category.replace('/index.php', '')
        category = category.replace('/mobile-phones/', '')
        def price(changeToNum):
            price = response.xpath(changeToNum).get()
            price = price.split()
            price = price[1].replace(',','')
            price = price.replace('-','')
            price = price.replace('/','')
            price = int(price)
            return price
        
        yield {
            'heading': response.xpath("//div[@class='tm-page-bg']/div[1]/div[1]/div[3]/div[1]/main/article/div/h1/text()").get(),
            'price': price("//div[@class='tm-page-bg']/div[1]/div[1]/div[3]/div[1]/main/article/div/div[1]/div[1]/div[2]/h2/text()"),
            'product_url': web_url + response.meta.get("product_url"),
            'productSmallImg': web_url + response.meta.get("productSmallImg"),
            'productLargeImg': web_url + response.xpath("//main[@class='tm-content']/article[1]/div[1]/div[1]/div[1]/div[1]/img/@src").get(),
            'description': response.xpath("//div[@class='tm-page-bg']/div[1]/div[1]/div[3]/div[1]/main/article/div/div[1]/div[2]/div[1]/dl").get(),
            'category': category,
            'seller_key': 'whatprice',
            'seller_keyID': 2,
            'type': 50
            }
