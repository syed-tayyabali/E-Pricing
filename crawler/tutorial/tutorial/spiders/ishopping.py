import scrapy 

class Ishopping(scrapy.Spider):
    name='ishopping'
    start_urls=['https://www.ishopping.pk/electronics/mobile-phones-tablet-pc/tablet-pc-price-in-pakistan.html']
    
    product_url = ''
    productSmallImg = ''
   
    def parse(self,response):
        for li in response.xpath("//div[@class='main-container col2-left-layout-']/div[1]/div[2]/div[1]/div[2]/dl[1]/dd[1]/ol/li"):
            # print(li.xpath(".//a/@href").getall())
            currentCategory = li.xpath('.//a/text()')[0].get()
            yield response.follow(li.xpath(".//a/@href")[0],callback=self.crawl_product, meta={'current_category': currentCategory})

    def crawl_product(self,response):
        side_panel = response.xpath("//div[@class='main-container col2-left-layout-']/div[1]/div[2]/div[1]/div[2]/dl[1]/dd[1]/ol/li/a/@href").get()
        if side_panel is not None:
            for li in response.xpath("//div[@class='main-container col2-left-layout-']/div[1]/div[2]/div[1]/div[2]/dl[1]/dd[1]/ol/li"):
                yield response.follow(li.xpath(".//a/@href")[0],callback=self.product, meta={'current_category': response.meta.get('current_category')})
        else:
            #this code is for if side panel is not available
            for li in response.xpath("//div[@class='main-container col2-left-layout-']/div[1]/div[3]/div[2]/div[1]/div[1]/ul[1]/li/div"):
                product_url = li.xpath(".//div[1]/h2/a/@href").get()
                productSmallImg = li.xpath(".//a/img/@src").get()
                yield response.follow(li.xpath(".//div[1]/h2/a/@href")[0],callback=self.parse_des,meta={'current_category': response.meta.get('current_category'),'product_url': product_url, 'productSmallImg': productSmallImg})
                
    def product(self,response):
        for li in response.xpath("//div[@class='main-container col2-left-layout-']/div[1]/div[3]/div[2]/div[1]/div[1]/ul[1]/li/div[1]"):
            product_url = li.xpath(".//div[1]/h2/a/@href").get()
            productSmallImg = li.xpath(".//a/img/@src").get()
            yield response.follow(li.xpath(".//div[1]/h2/a/@href")[0],callback=self.parse_des, meta = {'current_category': response.meta.get('current_category'),'product_url': product_url, 'productSmallImg': productSmallImg})
            
    def parse_des(self,response):
        def price(changeToNum):
            price = response.xpath(changeToNum).get()
            price = price.split()
            price = price[1].replace(',','')
            price = int(price)
            return price
        
        yield{
            'heading': response.xpath("//div[@class='main-container marg-top-bot-25 b bg']/div[2]/div[2]/div[1]/form[1]/div[1]/div[1]/div[2]/h1/text()")[0].get(),
            'price': price("//div[@class='main-container marg-top-bot-25 b bg']/div[2]/div[2]/div[1]/form[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/span[1]/text()"),
            'product_url': response.meta.get("product_url"),
            'productSmallImg': response.meta.get("productSmallImg"),
            'productLargeImg': response.xpath("//div[@class='row main-product-info']/div[1]/div[3]/div[2]/div[1]/img[1]/@src").get(),
            'description': response.xpath("//div[@class='main-container marg-top-bot-25 b bg']/div[2]/div[2]/div[1]/form[1]/div[4]/div[1]/div[1]/div[1]/div[1]/table[1]").get(),
            'overview': [response.xpath("//div[@class='main-container marg-top-bot-25 b bg']/div[2]/div[2]/div[1]/form[1]/div[4]/div[1]/div[1]/div[1]/div[1]/p[1]").get(),
                        response.xpath("//div[@class='main-container marg-top-bot-25 b bg']/div[2]/div[2]/div[1]/form[1]/div[4]/div[1]/div[1]/div[1]/div[1]/p[4]").get()],
            'category' : response.meta.get('current_category'),
            'seller_key': 'ishopping',
            'seller_keyID': 5,
            'type': 75
        }