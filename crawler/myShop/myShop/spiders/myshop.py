import scrapy

class MyShop(scrapy.Spider):
    name='Myshop'
    start_urls=['https://myshop.pk/laptops-desktops-computers/laptops']
    
    product_url = ''
    productSmallImg = ''
    current_category = ''
    
    def parse(self,response):
        for li in response.xpath("//div[@class='page-wrapper']/main[1]/div[4]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/ol[1]/li"):
            currentCategory = li.xpath('.//a/text()')[0].get()
            yield response.follow(li.xpath(".//a/@href")[0], callback=self.crawl_product, meta={'current_category': currentCategory})

    def crawl_product(self,response):
        for li in response.xpath("//div[@class='page-wrapper']/main[1]/div[4]/div[1]/div[4]/ol/li"):           
            product_url = li.xpath(".//div[1]/div[2]/strong/a/@href").get()
            productSmallImg = li.xpath(".//div/div/a/img[1]/@src").get()
            yield response.follow(li.xpath(".//div[1]/div[2]/strong/a/@href")[0],callback=self.parse_des, meta = {'product_url': product_url, 'productSmallImg': productSmallImg,'current_category': response.meta.get('current_category')})
            
    def parse_des(self,response):
        def price(changeToNum):
            price = response.xpath(changeToNum).get()
            price = price.split()
            price = price[1].replace(',','')
            price = price.replace('.00','')
            price = int(price)
            return price
        
        yield{
            'heading': response.xpath("//div[@class='page-wrapper']/main[1]/div[2]/div[1]/div[1]/div[1]/h1[1]/span[1]/text()").get(),
            'price': price("//div[@class='page-wrapper']/main[1]/div[2]/div[1]/div[1]/div[3]/div[1]/span/span/span/text()"),
            'product_url': response.meta.get("product_url"),
            'productSmallImg': response.meta.get("productSmallImg"),
            # 'productLargeImg': response.xpath("//div[@class='fotorama-item fotorama fotorama1595672202832 fotorama--fullscreen']/div[2]/div[1]/div[3]/div[2]/img[1]/@src").get(),
            'description': response.xpath("//div[@class='product info detailed vertical']/div[1]/div[2]/div[1]/table").get(),
            'overview': response.xpath("//div[@class='product info detailed vertical']/div[1]/div[4]/div[1]/div[1]").get(),
            'category': response.meta.get('current_category'),
            'seller_key': 'myshop',
            'seller_keyID': 4,
            'type': 25
        }