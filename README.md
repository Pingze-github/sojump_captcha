# sojump_captcha
一个分布式人工异步识别验证码的实现，以sojump.com（问卷星）为例。

### 原理

建立服务器，以问卷id和时间戳为参数，不断向sojump.com服务器请求验证码，并展示于服务器网页中，供使用者人工识别。识别结果将和其他参数一同储存于服务器数据库中。另外的自动问卷填写程序将会从数据库中取出成组的数据用于提交问卷。

目前已完成主要框架。

