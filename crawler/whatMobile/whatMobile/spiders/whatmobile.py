import scrapy

class Nextpage(scrapy.Spider):
    name = 'whatMobile'

    start_urls = ['https://www.whatmobile.com.pk/Samsung_Mobiles_Prices']

    current_category = ''
    product_url = ''
    productSmallImg = ''
    
    def parse(self,response):        
        i = 1
        ul = response.xpath("//div[@id='container']/div/div/ul")
        for li in ul.xpath('.//li'):
            i = i+1
            if i > 6:
                if len(li.xpath('.//a').getall()) > 0:
                    current_category = li.xpath('.//a/text()')[0].get()
                    yield response.follow(li.xpath('.//a/@href')[0], callback=self.crawl_product, meta={'current_category': current_category})
                        
                        
    def crawl_product(self,response):
        productSmallImg1 = ''
        n = 1
        tr = response.xpath("//body[1]/table/tbody/tr[2]/td[2]/table/tbody")
        for td in tr.xpath(".//tr"):
            n = n+1
            if n > 7:
                productSmallImg1 = td.xpath(".//td/a[1]/img/@src").get()
                return productSmallImg1
            
                    
        for page in  response.css("a.BiggerText::attr(href)"):
            product_url = response.css("a.BiggerText::attr(href)").get()
            productSmallImg =  response.xpath("//div[@class='mobiles']/div/div[1]/a/img/@src").get()
            yield response.follow(page, callback=self.parse_des, meta={'current_category': response.meta.get('current_category'), 'product_url': product_url, 'productSmallImg':productSmallImg, 'productSmallImg1': productSmallImg1})
            
        for page in response.css("div.item"):
            yield response.follow(page, callback=self.crawl_product, meta={'current_category': response.meta.get('current_category')})
            
        for page in response.css("li.presentation a::(href)"):
            yield response.follow(page, callback=self.crawl_product, meta={'current_category': response.meta.get('current_category')})

    def parse_des(self, response):
        web_url='https://www.whatmobile.com.pk'
        img_url='https://www.whatmobile.com.pk/'
        
        def extract_with_css(query):
            return response.css(query).get(default='').strip()
        
        def price(changeToNum):
            price = extract_with_css(changeToNum)
            if price == 'Rs. Coming Soon':
                price = int(0)
                return price
            else:
                price = extract_with_css(changeToNum).split()
                price = price[1].replace(',','')
                price = int(price)
                return price
        
        yield{
            'heading' : extract_with_css("h1.hdng3::text"),
            'price' : price("div.hdng3 span::text"),
            'product_url': web_url + response.meta.get('product_url'),
            # 'productSmallImg': img_url + response.meta.get('productSmallImg'),
            # 'productSmallImg1': img_url + response.meta.get('productSmallImg1'),
            'productLargeImg': img_url + response.xpath("//div[@id='centerContainer']/div/div[2]/div/div[3]/div/img/@src").get(),
            'description': extract_with_css("table.specs"),
            'category': response.meta.get('current_category')
        }