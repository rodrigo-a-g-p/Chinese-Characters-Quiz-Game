from bs4 import BeautifulSoup
import requests
import pandas


def scrape_chinese_characters(level, final_file_path):
    if level not in range(1, 5):
        return 'Error: level must be a number between 1 and 4 corresponding to HSK1 to HSK4'

    url = f"https://hsk.academy/en/hsk-{level}-vocabulary-list"

    soup = BeautifulSoup(requests.get(url).content, "html.parser")
    table_data = soup.find_all(name="td", class_="is-size-4")
    result_list = [el.findChildren()[0].decode_contents().replace("\n", "").replace(" ", "").split('<br/>') for el in table_data]

    new_df = pandas.DataFrame(result_list, columns=['Hanzi', 'Pinyin'])
    new_df.to_csv(final_file_path, index=False)


df = pandas.read_csv('data/HSK3.csv')
