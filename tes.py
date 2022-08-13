import asyncio
from janda import Nhentai, resolve

async def main():
    nh = Nhentai()
    data = await nh.get(274003)
    # print(data) ## unresolve
    print(resolve(data)) ## resolved

asyncio.run(main())