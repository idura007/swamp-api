import random, time, requests


from pitones import pitones


while True:
    rand_time = rand(5, 20)
    pos = random.randint(0, len(pitones) - 1)
    name = pitones[pos]['name']
    req = requests.post(
        f"http://localhost:3050/donation/:{name}",
        data=pitones[pos])
    print(req.status_code, req.reason)
    time.sleep(rand_time)
