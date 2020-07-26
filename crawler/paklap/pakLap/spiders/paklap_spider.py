import scrapy

class PaklabSpider(scrapy.Spider):
    name = 'paklap'
    # page_number = 2
    start_urls = [
        # 'https://www.paklap.pk/laptops-prices.html?p=1'
        'https://www.paklap.pk/laptops-prices.html'
    ]
    current_category = ''
    product_url = ''
    productSmallImg = ''


    def parse(self, response):
        # all_li_product = response.xpath("//div[@class='filter-options']/div/div[2]/ol/li")
        # page = all_li_product

        all_li_product = response.xpath("//div[@class='block-content filter-content']/div/div[6]/div['after']/ol")
        for page in all_li_product.xpath('.//li'):
            # currentCategory = page.xpath('.//a/text()')[0].get()
            yield response.follow(page.xpath(".//a/@href")[0], callback=self.crawl_product)
            # if len(page.xpath('.//a').getall()) >= 0:

        # next_page ='https://www.paklap.pk/laptops-prices.html?p='+ str(PaklabSpider.page_number) +''
        # if PaklabSpider.page_number <= 4:
        #     PaklabSpider.page_number += 1

    def crawl_product(self, response):
        product_url = response.xpath("//div[@class='product-item-info']/div[2]/strong/a/@href").get()
        for pg in response.xpath("//div[@class='product-item-info']/div[2]/strong"):
            productSmallImg = response.xpath("//div[@class='product-item-info']/div/a/img/@src").get()
            currentCategory = response.xpath('//div[@class="block-content filter-content"]/div[@class="filter-current"]/ol/li/span[2]/text()')[0].get()
            yield response.follow(pg.xpath('.//a/@href')[0], callback=self.print_specs, meta={'product_url':product_url,'productSmallImg':productSmallImg,'current_category': currentCategory})

        next_page = response.xpath("//div[@class='pages']/ul/li[@class='item pages-item-next']/a/@href").get()
        if next_page is not None:
            yield response.follow(next_page, callback=self.parse, meta={'product_url':response.meta.get('product_url'), 'productSmallImg':response.meta.get('productSmallImg'), 'current_category': response.meta.get('current_category')})


    def print_specs(self,response):
        # web_url = 'https://www.paklap.pk'
        
        def price(change):
            price = response.xpath(change).get()
            price = price.replace('Rs.','')
            price = price.replace(',','')
            price = int(price)
            return price
        
        yield{
            'name': response.xpath("//main/div[2]/div[1]/div[1]/div[1]/h1/span/text()").get(),
            'price': price("//main/div[2]/div[1]/div[1]/div[3]/div[1]/span/span/span/text()"),
            'product_url': response.meta.get("product_url"),
            'productSmallImg': response.meta.get("productSmallImg"),
            'productLargeImg': response.xpath("//div[@class='product media']/div[2]/div/div/div/div/div/div/img/@src").get(),
            'category': response.meta.get('current_category'),
            'specs': response.xpath("//main/div[2]/div[1]/div[4]/div[1]/div[2]/div[1]/table[@class='data table additional-attributes']").get(),

        }
