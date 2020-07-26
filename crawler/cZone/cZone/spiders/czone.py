import scrapy

class Czone(scrapy.Spider):
    name = 'czone'
    start_urls= ['https://czone.com.pk/laptops-pakistan-ppt.74.aspx']  
    
    current_category = ''
    product_url = '' 
    productSmallImg = ''
    
    def parse(self, response):
        for ul in response.xpath("//div[@class='container main-container headerOffset']/div[2]/div[@id='divSearchPanel']/div[@class='panel-group']/div[@id='divSubCategoryList']/div[@id='collapseSubcategory']/div[1]/ul/li"):
            currentCategory = ul.xpath('.//a/text()')[0].get()
            yield response.follow(ul.xpath(".//a/@href")[0], callback=self.crawl_product, meta={'current_category': currentCategory})
            
    def crawl_product(self, response):
        for div in response.xpath("//div[@id='divListView']/div"):
            product_url = response.xpath("//div[@id='divListView']/div/div/div/div/div[2]/div/div[1]/h4/a/@href").get()
            productSmallImg = response.xpath("//div[@class='template']/div[1]/div[1]/div[1]/div[1]/div[1]/a/img/@src").get()
            yield response.follow(div.xpath(".//div/div/div/div[2]/div/div[1]/h4/a/@href")[0], callback=self.parse_des, meta = {'product_url':product_url, 'productSmallImg':productSmallImg, 'current_category': response.meta.get('current_category')} )
        
        next_page = response.xpath("//a[@class='NextPage']/@href").get()    
        if next_page is not None:
            yield response.follow(next_page, callback=self.crawl_product, meta={'current_category': response.meta.get('current_category')})
            
    def parse_des(self, response):
        web_url = 'https://czone.com.pk'
        def price(change):
            price = response.xpath(change).get()
            price = price.replace('Rs.','')
            price = price.replace(',','')
            price = int(price)
            return price
        
        yield{
            'name': response.xpath("//div[@class='template']/div[@class='col-lg-8 col-md-8 col-sm-8 col-xs-12']/div/div/h1/text()").get(),
            'price': price("//div[@class='container main-container headerOffset']/div[2]/div[1]/div[2]/div[2]/div[1]/div[5]/div[1]/span[1]/text()"),
            'product_url': web_url + response.meta.get("product_url"),
            'productSmallImg': web_url + response.meta.get("productSmallImg"),
            'productLargeImg': web_url + response.xpath("//div[@id='divProductDetail']/div[@class='template']/div[1]/div[1]/div[1]/a/@href").get(),
            'specifications': [response.xpath("//div[@class='template']/div[2]/div[1]/div[@class='col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding product-properties']/div[4]/text()").get(),
                               response.xpath("//div[@class='template']/div[2]/div[1]/div[@class='col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding product-properties']/div[5]/ul").get()
                               ],
            'overview': response.xpath("//div[@class='row']/div[@class='product-tab w100 clearfix']/div[1]/div[1]/div[1]/div[1]").get(),
            'category': response.meta.get('current_category')   

        }