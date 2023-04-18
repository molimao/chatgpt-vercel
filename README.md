# ChatGPT-Vercel

![](assets/preview-light.png#gh-light-mode-only)
![](assets/preview-dark.png#gh-dark-mode-only)


### 环境变量

> v1.0.0 版本环境变量变化比较大，需要重新设置。以 `CLIENT_` 开头的变量会暴露给前端，请不要填写敏感信息。

| 环境变量                  | 说明                                                         | 默认值                                                       |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `OPENAI_API_KEY`          | OpenAI API Key，可以填写多个，用 \| 或者 换行 隔开，随机调用。最好是多填几个，API 有并发上的限制。如果用户不填自己的 key，那么就会使用你的 key。 | 无                                                           |
| `OPENAI_API_BASE_URL`     | 本地开发时可以填写 OpenAI 的代理服务器，但是 Vercel 不需要。并且不建议生产阶段使用。 | api.openai.com                                               |
| `NOGFW`                   | 表示可以服务器可以直连，不需要`OPENAI_API_BASE_URL`，就算设置了也不使用。 | false                                                        |
| `TIMEOUT`                 | OpenAI API 超时。单位为毫秒，Vercel Edge Function 最大超时为 30000。 | 30000                                                        |
| `PASSWORD`                | 网站密码                                                     | 无                                                           |
| `CLIENT_DEFAULT_MESSAGE`  | 默认提示信息                                                 | - xx xx                                                      |
| `CLIENT_GLOBAL_SETTINGS`  | 默认全局设置                                                 | {"APIKey":"","password":"","enterToSend":true}               |
| `CLIENT_SESSION_SETTINGS` | 默认对话设置，对话设置在每个对话中都是独立的。               | {"title":"","saveSession":true,"APITemperature":0.6,"continuousDialogue":true,"APIModel":"gpt-3.5-turbo"} |
| `CLIENT_MAX_INPUT_TOKENS` | 有效上下文+输入的 token 数。OpenAI 不同模型的最大 token 不一样，价格也不同，可以分别设置。并且 OpenAI 会统计输入+输出之和，但我们这里只限制输入。 | {"gpt-3.5-turbo":4096,"gpt-4":8192,"gpt-4-32k":32768}        |
| `SENDKEY`                 | 使用 [Server 酱](https://sct.ftqq.com/sendkey) 推送帐号余额以及可用状态到微信，如果需要自行获取。推送时间为早上 8 点和晚上 8 点，在 vercel.json 文件中修改。如果 key 太多，超过 20 个，有可能失败。 | 无                                                           |
| `SENDCHANNEL`             | [Server 酱](https://sct.ftqq.com/sendkey) 的推送通道，默认微信服务号。 | 9                                                            |

有两种设置方式

1. 将 `.env.example` 文件修改为 `.env`，在 `.env` 中设置。

2. Vercel 中设置 `Environment Variables`。尽量使用这种方式，比较方便。会在下次部署时生效。

   ![](assets/environment.png)

### 默认全局设置

> 记得删除注释，或者直接复制上面表格里的。

```json5
{
  "APIKey": "", // 默认填写的 key，不需要填写，否则其他人看得到。
  "password": "", // 默认填写的密码，不需要填写，否则其他人看得到。
  "enterToSend": true // 回车键发送消息
}
```
### 默认对话设置

> 对话设置在每个对话中都是独立的。记得删除注释，或者直接复制上面表格里的。

```json5
{
  "title": "", // 对话标题，不需要填写
  "saveSession": true, // 记录当前对话内容，刷新不会丢失。关闭后仍然会记录锁定的对话。
  "APITemperature": 0.6, // 0-2，思维发散程度，越高 ChatGPT 思维就越发散，开始乱答，甚至会乱码，建议小于 1 。
  "continuousDialogue": true, // 开启连续对话，每次都需要将上下文传给 API。
  "APIModel": "gpt-3.5-turbo" // 模型
}
```

## 提交你的 Prompts

1. Fork 本项目。
2. 修改 `prompts.md`。
3. Pull Request 即可。

如果你不懂这个操作，也可以直接在 Issues 提交你的 Prompts。目前大部分 Prompts 来自于 [awesome-chatgpt-prompts-zh](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)，当然，这个仓库大多数也是翻译的 [awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts)，一并感谢。

#### 要求

- 把需要输入的内容放在最后，可以提示 ChatGPT 开始输入了，比如 “我的第一句话是：”。
- 尽可能去优化已有的 Prompts，而不是重复添加。
- 添加到结尾，我会定期整理。

## 赞赏

如果本项目对你有所帮助，可以给小猫买点零食，但不接受任何付费功能请求。

![](./assets/reward.gif)

## License

[MIT](./LICENSE)