import scrapy

class PriceOyeSpider(scrapy.Spider):
    name = 'priceoye'
    start_urls = [
        'https://priceoye.pk'
    ]

    def parse(self, response):
        for link in response.xpath("//div[@class='sb-all-category']/amp-accordion[1]/section/ul/li"):
            yield response.follow(link.xpath(".//a/@href")[0], callback=self.crawl_product)

    def crawl_product(self, response):
        for pg in response.xpath("//div[@id='content']/div[@class='product-container']/div/section/div[@class='product-list']/div"):
            print(pg)
            yield response.follow(pg.xpath(".//a/@href")[0], callback=self.parse_des)

        next_page = response.xpath("//div[@class='pagination']/a/@href").get()
        if next_page is not None:
            yield response.follow(next_page, callback=self.crawl_product)

    def parse_des(self, response):
        x = response.xpath("//section[@class='product-section container card']/div[@class='row card']/div[@class='column column-40']/div[@class='product-price']/div[@class='dom-hide1 expected-price']/span[@class='summary-price']/text()").getall()
        i = response.xpath("//section[@class='product-section container card']/div[@class='row card']/div[@class='column column-40']/div[@class='product-price']/span[@class='summary-price']/text()").getall()
        if i is not None:
            yield {
            'heading': response.xpath("//section[@class='product-section container card']/div/div[@class='product-title']/h2/text()").get(),
            'Price' :  response.xpath("//section[@class='product-section container card']/div[@class='row card']/div[@class='column column-40']/div[@class='product-price']/span[@class='summary-price']/text()").get()
            }
        elif x is not None:
            yield{
                'heading': response.xpath("//section[@class='product-section container card']/div/div[@class='product-title']/h2/text()").get(),
                'Price': response.xpath("//section[@class='product-section container card']/div[@class='row card']/div[@class='column column-40']/div[@class='product-price']/div[@class='dom-hide1 expected-price']/span[@class='summary-price']/text()").get()
            }
        else:
            yield {
                'heading': response.xpath("//section[@class='product-section container card']/div/div[@class='product-title']/h2/text()").get(),
                'Price': response.xpath("//section[@class='product-section container card']/div[@class='row card']/div[@class='column column-40']/div[@class='product-price']/div[@class='product-price-lowest']/span[@class='summary-price']/text()").get()
            }