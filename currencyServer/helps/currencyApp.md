
# CurrencyApp

Currency App is clean, efficient, functional which provides not only currency rate data but also comprehensive statistic analysis visualization.

## Structure

Currency Object represents one basic unit aka currency.

Rate Object encapsulates all info of a currency pair which contains two Currency Objects. Each currency rate data from an institution at one time is stored in a Rate Object. All currency rate data are stored in RateSheet Object.

Institution Object represents one institution which could be a Central bank, a Card Association or a Commercial Bank. It includes all info of an institution, and holds a ratehistory reference array which record all the currency rate data.



Currencies : CNY, USD, CAD, EUR, GBP, JPY
Institutions :



```
点击牌价－》（按货币比价）：即不同银行同一货币在一定时间内
点击银行－》（按银行查看）：即同一银行不同货币在一定时间内
点击时间－》（按银行－货币查看）：即同一银行同一货币在一定时间内
```



### Currency Object

```
name,
code,
codenumber,
producer: Institution Object ref
```

### Rate Object

```
institutionSWIFT,
date,
time,
base,
target,
buy,
sell,
cashbuy,
cashsell,
centralparityrate,
```

### RateSheet Object

```
inistitutionSWIFT,
date,
rates: Rate Object Array
```

### Institution Object

```
country,
name: institution's name,
alias: institution's name initial,
swift: SWIFT code,
basecurrency: Currency Object Array,
foreigncurrencies: Currency Object Array,
ratehistory: Rate Array
```

## Initlize

```
1. initlize Currency
2. initlize Insititution
```







### Services

#### 1. System Configuration

```
Currency
Institution
```

#### 2. Feed Rates Data

```
// 更新rates数据
feedRatesdata()

RateSheet
Rate
```

#### 3. Service Interfaces

```
// 更新用户个人配置数据
// update available {institutions, currencies} and system configurations
updateConfiguration()
getConfiguration()

// sync the latest subscribed rates
syncSubscribedRates(ics) -> latest_ics

// 获取rates数据
// return the latest rates for {institutions-currencies}
// 参数不同即可实现:
// 即同一银行不同货币在一定时间内
// 即不同银行同一货币在一定时间内
iscsrates(iscs) -> rates

// 获取最新的一条rate
subscribedics(subscribedics) -> rates

// return all rates of type t from {institution-currency} from Date fd to td(default now())
// 即同一银行同一货币在一定时间内
rateHistory(i, c, t, fd, td) -> rateHistory
```



### Logic

```
Axios.interceptors.request
  设置loading indicator
  设置access_token

Axios.interceptors.response
  取消loading indicator
  更新并设置access_token
  重新发起上一次请求
  显示登录界面

SignIn
  获取并储存refresh_token&access_token

App.vue
  token
  configuration
  vuex
  storage

Tabs.vue
  直接使用
```
