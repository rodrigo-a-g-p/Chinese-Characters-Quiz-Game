from bs4 import BeautifulSoup
import requests
import pandas


def scrape_chinese_characters(level, final_file_path):
    if not final_file_path:
        return "Error: no filepath specified"

    if level not in range(1, 6):
        return 'Error: level must be a number between 1 and 5 corresponding to HSK1 to HSK5'

    url = f"https://hsk.academy/en/hsk-{level}-vocabulary-list"

    soup = BeautifulSoup(requests.get(url).content, "html.parser")
    table_data = soup.find_all(name="td", class_="is-size-4")
    result_list = [el.findChildren()[0].decode_contents().replace("\n", "").replace(" ", "").split('<br/>') for el in table_data]

    new_df = pandas.DataFrame(result_list, columns=['Hanzi', 'Pinyin'])
    new_df.to_csv(final_file_path, index=False)


scrape_chinese_characters(5, "filepath_here")

df = pandas.read_csv("data/HSK5.csv")
