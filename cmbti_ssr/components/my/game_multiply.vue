<template>
  <div class="multiply">
    <div class="head">
      <span class="olive">
        <img src="/static/img/olive1.png" alt="">
      </span>
      <span>
        <p>透過
          <a href="javascript:;" @click="dialog_verify">可驗證公平</a> 的押買大小遊戲，</p>
        <p>你可將你的sBTC 翻4,750倍！</p>

      </span>
      <span class="olive">
        <img src="/static/img/olive2.png" alt="">
      </span>
    </div>
    <div class="head_child">
      <p>先設定投注金額，然後點擊押大、押小按鈕即可進行投注，如你押大而滾出大於指定數字 或 押小而滾出小於指定數字，則可立即獲得派彩！</p>
      <p>你還可改變賠率或成功機率，增加你的獲勝金額及機率！</p>
      <!-- <p>Get 1 free lottery ticket and 1 reward points for every 0.00000500 BTC that you wager!</p> -->
    </div>
    <div class="content">
      <div class="num_clock">
        <ul class="clearfix">
          <li class="poll_num">
            <ul>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </ul>
          </li>
          <li class="poll_num">
            <ul>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </ul>
          </li>
          <li class="poll_num">
            <ul>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </ul>
          </li>
          <li class="poll_num">
            <ul>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </ul>
          </li>
          <li class="poll_num">
            <ul>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="btn">
        <div style="margin-right:10px;" @click="poll('hi')" disabled="btn1_lock">
          <img src="/static/img/btn1.png" alt="">
        </div>
        <div style="margin-left:10px;" disabled="btn2_lock" @click="poll('lo')">
          <img src="/static/img/btn2.png" alt="">
        </div>
      </div>
      <div class="win_hint">

        <p>押大，如果得到一個高於
          <font>{{hi}}</font> 的數字則贏！</p>
        <p>押小，如果得到一個小與
          <font>{{lo}}</font>
          的數字則贏！
        </p>
      </div>
      <div style="min-height:40px;">
        <div class="hint_success" v-if="hint_success">
          {{message_hint}}
        </div>
        <div class="hint_error" v-if="hint_error">
          {{message_hint}}
        </div>
      </div>
      <div class="dashed">
        <div class="win_block">
          <div class="win_balance" id="move">
            <span class="account_balance" style="font-weight:600;display:inline-block;vertical-align:middle;">賬戶餘額:</span>
            <span class="account_chara" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;display:inline-block;vertical-align:middle;font-weight:600;">{{this.$store.state.user_info.Profit | moneyFormat}} sBTC</span>
            <span class="shrink" @click="shrink_balance">
              <i class="fa fa-sort-down"></i>
            </span>
          </div>
          <div class="win_balance_info">
            <ul>
              <li v-for="(item,index) in win_balance" :class="item.result?'chara_success':'chara_error'" :key="index">
                <!-- {{item.chara}} -->
                <div class="row" style="margin:5px 0 ;">
                  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="display:inline-block">{{item.chara}}</div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="text-align:right;color:#979797;display:inline-block;text-align:right;">-- &nbsp;&nbsp;{{item.times | timerFilters}}</div>
                </div>

              </li>

            </ul>
          </div>
        </div>
      </div>
      <div class="select row">
        <div class="select_left col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div class="one">
            <span class="fixaction" style="cursor:default;max-width:175px;" onselectstart="return false;">每次最高金額</span>
            <span class="shift" style="max-width:108px;width:100%;text-align:center;">
              <font style="padding: 8px 0;cursor:default">20 BTC</font>
            </span>
          </div>
          <div class="two" onselectstart="return false;">
            <span class="fixaction" style="cursor:default;max-width:114px;">買入金額</span>
            <span class="shift" style="max-width:34px;" @click="multiply('/2')">/2</span>
            <span class="shift" style="max-width:34px;" @click="multiply('2*')">2x</span>
            <span class="shift" style="max-width:44px;" @click="multiply('min')">MIN</span>
            <span class="shift" style="max-width:44px;" @click="multiply('max')">MAX</span>
          </div>
          <div class="three">
            <input type="text" v-model="buy_num" @keyup="buy_money" @blur="buy_blur" style="max-width:286px;width:100%;text-align:center;">
          </div>
        </div>
        <div class="select_right col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div class="one">
            <span class="fixaction" style="cursor:default;max-width:114px;vertical-align:top;" onselectstart="return false;">盈利</span>
            <span class="shift" style="max-width:158px;cursor:default;vertical-align:top;">
              <font>{{profit | moneyFormat}}</font>
            </span>
          </div>
          <div class="two">
            <div>
              <span class="fixaction" style="cursor:default;max-width:136px;width:100%;text-align:center;" onselectstart="return false;">賭注賠率</span>
              <span class="shift" style="margin-top:5px;max-width:136px;">
                <input type="text" v-model="bet" style="margin-bottom:5px;" @keyup="algol_bet" @blur="ineger">
              </span>
            </div>
            <div>
              <span class="fixaction" style="cursor:default;max-width:136px;width:100%;text-align:center;" onselectstart="return false;">成功機率</span>
              <span class="shift" style="margin-top:5px;max-width:136px;">
                <input type="text" v-model="win_chance" style="margin-bottom:5px;" @blur="win_blur" @keyup="win_input">
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_table" v-loading="table_load">

      <table>
        <thead>
          <tr>
            <th>時間</th>
            <th>投注項</th>
            <th>投注額</th>
            <th>賠率</th>
            <th>賽果</th>
            <th>投擲數字</th>
            <th>派彩</th>
            <!-- <th>JPOT</th> -->
            <th>驗證</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in GameDice_List" :key="index">
            <td>{{item.CreatedAt | timerFilter}}</td>
            <td>{{item.BET | bet_filter}}</td>
            <td>{{item.Stake | moneyFormat}}</td>
            <td>{{item.Multiplier}}</td>
            <td>{{item.Profit+'+'+item.BET | result_filter}}</td>
            <td>{{item.Roll}}</td>
            <td>{{item.Profit | moneyFormat}}</td>
            <!-- <td>✖</td> -->
            <td>
              <!-- <router-link :to="{path:'/my/multiply_verfily',query:{ServerSeed:item.ServerSeed,ServerSeedHash:item.ServerSeedHash,ClientSeed:item.ClientSeed,Nonce:item.Nonce}}">CLICK</router-link> -->
              <a target="_blank" :href="'../../static/page/verify_result.html?ServerSeed='+item.ServerSeed+'&ServerSeedHash='+item.ServerSeedHash+'&ClientSeed='+randomClient+'&Nonce='+item.Nonce">CLICK</a>
            </td>
          </tr>
        </tbody>
      </table>
      <el-pagination layout="prev, pager, next" :total="total/20*10" @current-change="cutPage">
      </el-pagination>
    </div>
    <div>
      <div class="dialog">
        <el-dialog :visible.sync="dialogFormVisible">
          <h2>下一卷的種子</h2>
          <div class="code">
            <div class="server_seed_hash">
              <div>服務器種子HASH：</div>
              <div>
                <textarea :value="dialog_one.ServerSeedHash?dialog_one.ServerSeedHash:''" cols="56" rows="4" disabled></textarea>
              </div>
            </div>
            <div class="client_seed">
              <div>客戶端種子：</div>
              <div>
                <input type="text" v-model="randomClient">
              </div>
            </div>
            <div class="server_nonce">
              <div>隨機數：</div>
              <div>
                {{dialog_one.Nonce}}
              </div>
            </div>
          </div>
          <h2 style="margin:0;">歷史滾動數據</h2>
          <router-link v-if="GameDice_List[0]" :to="{path:'/my/multiply_verfily',query:{ServerSeed:GameDice_List[0].ServerSeed,ServerSeedHash:GameDice_List[0].ServerSeedHash,ClientSeed:GameDice_List[0].ClientSeed,Nonce:GameDice_List[0].Nonce}}">(點擊跳轉到驗證頁面)</router-link>
          <div class="after_code" v-if="GameDice_List[0]">
            <div class="server_seed_hash">
              <div>服務器種子HASH：</div>
              <div>
                <textarea name="" :value="GameDice_List[0].ServerSeedHash" id="" cols="56" rows="4" disabled></textarea>
              </div>
            </div>
            <div class="server_seed_hash" style="background:rgb(236, 247, 252)">
              <div>服務器種子：</div>
              <div>
                <textarea name="" id="" cols="56" :value="GameDice_List[0].ServerSeed" rows="4" disabled></textarea>
              </div>
            </div>
            <div class="client_seed" style="background:rgb(222, 241, 252);border-bottom:1px solid #bde6ff;">
              <div>客戶端種子：</div>
              <div>
                <input type="text" :value="GameDice_List[0].ClientSeed" disabled>
              </div>
            </div>
            <div class="client_seed" style="border-bottom:1px solid #bde6ff;padding:16px 0 ;">
              <div>隨機數：</div>
              <div>
                {{ GameDice_List[0].Nonce}}
              </div>
            </div>
            <div class="client_seed" style="padding:16px 0 ;">
              <div>滾到的數字：</div>
              <div>
                {{ GameDice_List[0].Roll}}
              </div>
            </div>
          </div>
          <div class="chara">
            <h4></h4>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm_dio">確 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import mGame from "@/axios_joggle/axios_game";
import {
  clearInterval,
  clearTimeout,
  setInterval,
  setTimeout,
  clearImmediate
} from "timers";
import filtration from "@/assets/filtration";
export default {
  data() {
    return {
      btn1_lock: true, //
      btn2_lock: false,
      timer: "", // 定時器
      bet: "2.00", // 盈利倍數
      win_chance: "47.50%", // 盈利機率
      hi: "5250", // hi
      lo: "4750", // lo
      profit: "1", // 盈利金額
      buy_num: "1", // 買入金額
      randomClient: "", // 客戶端隨機數
      poll_data: [], // 滾動的數字
      GameDice_List: [], // 列表數據
      total: 20, // 縂頁數
      table_load: true, // 列表loading
      table_top_time: "",
      message_hint: "", // 滾動后 勝負 文字提示
      hint_error: false, // 贏錢顯示樣式
      hint_success: false, // 輸錢顯示央視
      dialogFormVisible: false, // 彈層
      dialog_one: [], // 彈層内的數據
      dialog_two: [], // 彈層内的數據
      win_balance: [],
      win_timers: ""
    };
  },
  watch: {},
  filters: {
    timerFilters(val) {
      // console.log(filtration.timezone_filter(val))
      if (val) {
        let value = filtration.timezone_filter(val);
        return filtration.getDateDiff(value);
      }
    },
    timerFilter(val) {
      return filtration.timezone_filter(val);
    },
    moneyFormat(val) {
      return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
    },
    bet_filter(val) {
      if (val == "hi") {
        return "押大";
      } else {
        return "押小";
      }
    },
    result_filter(val) {
      let profit = val.split("+")[0];
      let yourSelect = val.split("+")[1];
      if (profit > 0) {
        if (yourSelect == "hi") {
          return "大";
        } else {
          return "小";
        }
      } else {
        if (yourSelect == "hi") {
          return "小";
        } else {
          return "大";
        }
      }
    }
  },
  methods: {
    // 按彈窗 確定
    confirm_dio() {
      this.$message.success("設置成功");
      this.dialogFormVisible = false;
    },
    shrink_balance() {
      if (
        $(".win_block")
          .css("height")
          .split("px")[0] == "32"
      ) {
        $(".shrink i").attr("class", "fa fa-sort-down");
        // $('.account_balance').css("color","black")
        // $('.account_chara').css('color',"black")
        $(".win_block").css("height", "200px");
        // $('.account_balance').css('background','linear-gradient(#dba54a, #be7e22)')
        // $('.win_block .win_balance').css("background","rgb(0,0,0,.2)")
      } else {
        $(".shrink i").attr("class", "fa fa-sort-up");
        $(".account_balance").css("color", "white");
        $(".account_chara").css("color", "#edb229");
        $(".win_balance").css("padding-left", "0");
        $(".account_balance").css("padding", "0 5px");
        // $('.account_balance').css('background','linear-gradient(#1f4759, #15344c)')
        $(".win_block").css("height", "32px");
        $(".win_block .win_balance").css("background", "none");
        $(".win_block .win_balance").css("border-bottom", "none");
      }
    },
    // diaolg
    dialog_verify() {
      this.dialogFormVisible = true;
      mGame.get_server_has().then(res => {
        this.dialog_one = res.data.Data;
      });
    },
    // 加載頁面時 請求
    get_user() {
      mGame.get_user_list({ pageSize: 20, pageIndex: 1 }).then(res => {
        this.table_load = false;
        if (res.data.Data.Data) {
          this.GameDice_List = res.data.Data.Data;
        }
        this.total = Math.ceil(res.data.Data.total);
        // this.table_top_time = GameDice_List;
      });
    },
    // 切換投注信息頁數
    cutPage(val) {
      mGame.get_user_list({ pageSize: 20, pageIndex: val }).then(res => {
        this.table_load = false;
        if (res.data.Data.Data) {
          this.GameDice_List = res.data.Data.Data;
        }
      });
    },
    // 分頁的active
    nav_acive() {},
    // 滾動
    poll(val) {
      // 獲取滾動的ul
      let poll_nums = document.querySelectorAll(".poll_num>ul");
      // // 定時器
      let moveLength = 76;
      let move_all_length = 0;
      let poll_max_length =
        document.querySelectorAll(".poll_num>ul>li").length / 5;
      if (this.btn1_lock) {
        if (
          Number(this.buy_num) >= 1 &&
          Number(this.buy_num) % 1 === 0 &&
          this.profit != 0
        ) {
          this.btn1_lock = false;
          // 調用定時random
          this.setInterval_random();
          // 發送請求 轉動轉盤
          mGame
            .get_random_nums({
              client_seed: this.randomClient,
              stake: this.buy_num,
              multiplier: this.bet,
              m: val
            })
            .then(res => {
              this.btn1_lock = true;
              if (res.data.ResultCode == 200) {
                this.poll_data = res.data.Data;
                let random_nums = this.auto_w(this.poll_data.Roll);
                let random_num = random_nums.split("");
                for (let i = 0; i < poll_nums.length; i++) {
                  poll_nums[i].style.top =
                    "-" + random_num[i] * moveLength + "px";
                }
                this.GameDice_List = this.poll_data.GameDice_List;
                if (this.poll_data.gameProfit >= 0) {
                  this.hint_success = true;
                  this.hint_error = false;
                  this.message_hint =
                    "恭喜您，您贏了 " +
                    this.poll_data.gameProfit
                      .toString()
                      .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,") +
                    " sBTC";
                  // this.$message.success(
                  //   "恭喜您，您贏了 " +
                  //     this.poll_data.gameProfit
                  //       .toString()
                  //       .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,") +
                  //     " sBTC"
                  // );

                  this.win_balance_info(
                    this.poll_data.gameProfit,
                    1,
                    this.GameDice_List[0].CreatedAt
                  );
                } else {
                  this.hint_success = false;
                  this.hint_error = true;
                  this.message_hint =
                    "很遺憾，您輸了 " +
                    this.poll_data.gameProfit
                      .toString()
                      .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,") +
                    " sBTC";
                  // this.$message.error(
                  //   "很遺憾，您輸了 " +
                  //     this.poll_data.gameProfit
                  //       .toString()
                  //       .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,") +
                  //     " sBTC"
                  // );
                  this.win_balance_info(
                    this.poll_data.gameProfit,
                    0,
                    this.GameDice_List[0].CreatedAt
                  );
                }
                // 所剩餘額
                this.$store.state.user_info.Profit = this.poll_data.Profit;
                // 修改localstorage
                let user_info = JSON.parse(localStorage.getItem("user_info"));
                user_info.Profit = res.data.Data.Profit;
                localStorage.setItem("user_info", JSON.stringify(user_info));
                //   $utill.fMoney($store.state.user_info.Profit,$store.state.Bitcoin)
                // 清除定時器
                clearInterval(this.timer);
              } else {
                for (let i = 0; i < poll_nums.length; i++) {
                  poll_nums[i].style.top = "-" + 6 * moveLength + "px";
                }
                clearInterval(this.timer);
              }
            })
            .catch(err => {
              this.btn1_lock = true;
              this.hint_success = false;
              this.hint_error = true;
              this.message_hint = "請輸入正確的金額、賭注賠率或者成功機率";
              // this.$message.error("請輸入正確的金額、賭注賠率或者成功機率");
            });
        } else {
          this.hint_error = true;
          this.message_hint = "請輸入正確的金額、賭注賠率或者成功機率";
          // this.$message.error("請輸入正確的金額、賭注賠率或者成功機率");
        }
      }
      setTimeout(() => {}, 1000);
    },
    // win_balance
    win_balance_info(balance, result, times) {
      if (this.win_balance.length >= 6) {
        this.win_balance.shift();
      }
      // result 傳0 代表輸 1代表贏
      if (result) {
        this.win_balance.unshift({
          chara:
            "您贏了 " +
            balance.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,") +
            " sBTC",
          result: 1,
          times: times
        });
      } else {
        this.win_balance.unshift({
          chara:
            "您輸了 " +
            balance.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,") +
            " sBTC",
          result: 0,
          times: times
        });
      }
    },
    // 定時器滾動
    setInterval_random() {
      // 獲取滾動的ul
      let poll_nums = document.querySelectorAll(".poll_num>ul");
      // 定時器
      let moveLength = 76;
      let move_all_length = 0;
      let poll_max_length =
        document.querySelectorAll(".poll_num>ul>li").length / 5;
      this.timer = setInterval(() => {
        if (move_all_length >= moveLength * (poll_max_length - 1)) {
          move_all_length = 0;
          for (let i = 0; i < poll_nums.length; i++) {
            poll_nums[i].style.top = move_all_length;
          }
        } else {
          move_all_length += moveLength;
          for (let i = 0; i < poll_nums.length; i++) {
            poll_nums[i].style.top = "-" + move_all_length + "px";
          }
        }
      }, 50);
    },
    // 自動補全隨機數
    auto_w(val) {
      return val.toString().padStart(5, "0");
    },
    // 選擇最大 最小
    multiply(val) {
      // 買入金額
      let b = Number(this.buy_num);
      if (val == "/2") {
        this.buy_num = this.verify_num_true(b, "/");
      } else if (val == "2*") {
        this.buy_num = this.verify_num_true(b, "*");
      } else if (val == "min") {
        this.buy_num = "1";
      } else {
        if (this.$store.state.user_info.Profit > 2000000000) {
          this.buy_num = 2000000000;
        } else {
          this.buy_num = this.$store.state.user_info.Profit;
        }
      }
    },
    // 驗證數字的有效性
    verify_num_true(val, symbol) {
      let a = "10";
      if (typeof val == "string") {
        val = Number(val);
        if (symbol == "/") {
          if (val <= 1) {
            return 1;
          } else if (val % 1 != 0) {
            return (val / 2).toFixed(0);
          } else {
            return (val / 2).toFixed(0);
          }
        } else if (symbol == "*") {
          if (val <= 1) {
            val = 1;
            return val * 2;
          } else if (val % 1 != 0) {
            return (val * 2).toFixed(0);
          } else if (val >= 2000000000) {
            return 2000000000;
          } else {
            return val * 2;
          }
        }
      } else {
        if (symbol == "/") {
          if (val <= 1) {
            return 1;
          } else if (val % 1 != 0) {
            return (val / 2).toFixed(0);
          } else {
            return (val / 2).toFixed(0);
          }
        } else if (symbol == "*") {
          if (val <= 1) {
            val = 1;
            return val * 2;
          } else if (val % 1 != 0) {
            return (val * 2).toFixed(0);
          } else if (val >= 2000000000) {
            return 2000000000;
          } else {
            return val * 2;
          }
        }
      }
      // if(val.typeOf()){}
    },
    // 買入金額 失去焦點
    buy_blur() {
      if (this.buy_num) {
        if (this.buy_num >= 1) {
          return parseInt(this.bet - 1) * parseInt(this.buy_num);
        } else {
          return parseInt(this.bet - 1) * parseInt(1);
        }
      } else {
        this.buy_num = 1;
      }
    },
    // 盈得机率
    win_blur() {
      if (this.win_chance) {
        if (this.win_chance.indexOf("%") == "-1") {
          this.get_other3();
          this.win_chance += "%";
        } else {
          this.get_other3();
          this.win_chance += "%";
        }
      } else {
        this.win_chance = "47.50%";
      }
      this.get_hi_lo(this.win_chance);
      //
    },
    win_input() {
      if (this.win_chance) {
        this.get_other2();
      }
    },
    // 買入金額
    buy_money() {
      if (this.buy_num) {
        if (Number(this.buy_num) > 2000000000) {
          this.buy_num = 2000000000;
          this.profit = parseInt(
            (this.bet - 1).toFixed(2) * parseInt(this.buy_num)
          );
        } else if (Number(this.buy_num) <= 1) {
          this.buy_num = 1;
          this.profit = parseInt(
            (this.bet - 1).toFixed(2) * parseInt(this.buy_num)
          );
        } else {
          // 買入金額
          let m = this.buy_num;
          this.profit = parseInt((this.bet - 1).toFixed(2) * parseInt(m));
        }
      }
    },
    // 盈利 規範 防止輸入錯誤
    get_other3() {
      if (this.win_chance.indexOf("%") != -1) {
        let chance = this.win_chance.split("%")[0];
        if (chance <= 0) {
          this.win_chance = "0.01";
        } else if (chance >= 94.6) {
          this.win_chance = "94.60";
        } else {
          this.win_chance = Number(chance).toFixed(2);
        }
      } else {
        if (this.win_chance <= 0) {
          this.win_chance = "0.01";
        } else if (this.win_chance >= 94.6) {
          this.win_chance = "94.60";
        } else {
          this.win_chance = Number(this.win_chance).toFixed(2);
        }
      }
    },
    // 盈利機率 算法
    get_other2() {
      // 總的勝率
      let c = 95;
      // 賭注錢數
      let m = this.buy_num;
      let d;
      if (this.win_chance.indexOf("%") != "-1") {
        let win_value = this.win_chance.split("%")[0];
        if (win_value < 0.02) {
          this.profit = "4749";
          this.bet = "4750.00";
          this.get_hi_lo(this.win_chance);
        } else if (win_value > 94.6) {
          this.profit = "0";
          this.bet = "1.01";
          this.get_hi_lo(this.win_chance);
        } else {
          // 賭注倍率
          d = c / win_value;
          this.bet = d.toFixed(2);
          this.profit = parseInt((this.bet - 1).toFixed(2) * m);
          this.get_hi_lo(this.win_chance);
        }
      } else {
        if (this.win_chance < 0.02) {
          this.profit = "4749";
          this.bet = "4750.00";
          this.get_hi_lo(this.win_chance);
        } else if (this.win_chance > 94.6) {
          this.profit = "0";
          this.bet = "1.01";
          this.get_hi_lo(this.win_chance);
        } else {
          d = c / this.win_chance;
          this.bet = d.toFixed(2);
          this.profit = parseInt((this.bet - 1).toFixed(2) * m);
          this.get_hi_lo(this.win_chance);
        }
        // 賭注倍率
      }
    },
    // 盈利倍数 blur 函数
    ineger() {
      if (this.bet <= 1) {
        this.bet = 1.01;
        this.get_other();
      } else if (this.bet > 4750) {
        this.bet = 4750;
        this.get_other();
      } else {
        this.bet = Number(this.bet).toFixed(2);
        this.get_other();
      }
    },
    // 盈利倍数 input 函数
    algol_bet() {
      if (this.bet) {
        if (this.bet > 4750) {
          this.bet = 4750;
          this.get_other();
        } else {
          this.get_other();
        }
      }
    },
    // 盈利倍数 算法
    get_other() {
      // 盈利
      if (this.bet) {
        this.profit = parseInt((this.bet - 1).toFixed(2) * this.buy_num);
      } else {
        this.bet = 1.01;
        this.profit = parseInt((this.bet - 1).toFixed(2) * this.buy_num);
      }
      // 總的勝率
      let a = 95;
      // 總的勝率 / 輸入的盈利倍率 = 贏得機率
      let b = a / this.bet;
      // 贏得機率
      this.win_chance = b.toFixed(2) + "%";
      // 贏得機率 * 100 得到LO
      this.lo = parseInt(b.toFixed(2) * 100);
      // 贏得機率 * 100 得到HI
      this.hi = parseInt(10000 - b.toFixed(2) * 100);
    },
    // hi ho 的值 -> 賭大小 按鈕下面的文字
    get_hi_lo(probability) {
      if (probability.indexOf("%") != "-1") {
        this.lo = parseInt(probability.split("%")[0] * 100);
        this.hi = parseInt(10000 - this.lo);
      } else {
        this.lo = parseInt(probability * 100);
        this.hi = parseInt(10000 - this.lo);
      }
    },
    getNum() {
      var chars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      var nums = "";
      for (var i = 0; i < 16; i++) {
        var id = parseInt(Math.random() * 61);
        nums += chars[id];
      }
      return nums;
    }
  },
  mounted() {
    this.verify_num_true();
    // $('#move').draggable()
    // let timer = setInterval(()=>{
    //   console.log(123)
    // },1000)
    if (this.win_timers) {
      clearInterval(this.win_timers);
    }
    this.win_timers = setInterval(() => {
      if (this.win_balance.length > 0) {
        new Promise((resolve, reject) => {
          this.win_balance.push("");
          resolve();
        }).then(() => {
          if (this.win_balance[this.win_balance.length - 1] == "") {
            this.win_balance.pop();
            // console.log(123)
            // this.win_balance =
            // console.log(456,this.win_balance)
          }
        });
      }
    }, 10000);
  },
  created() {
    // 調用 server hash 才能使用
    mGame.get_server_has();
    this.randomClient = this.getNum();
    this.get_user();
    this.btn1_lock = true;
    this.btn2_lock = true;
  },
  distroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.win_timers) {
      clearInterval(this.win_timers);
    }
  }
};
</script>
<style lang="less" scoped>
@media screen and(max-width: 1024px) {
  .dashed {
    margin: 5px 60px 10px !important;
  }
}
@media screen and(max-width: 768px) {
  .dashed {
    display: none;
  }
}
@media screen and(max-width: 430px) {
  .multiply .content .select .select_right {
    text-align: center !important;
  }
  .multiply .content .select .select_left {
    text-align: center !important;
  }
  .multiply .content .dashed {
    display: none;
  }
  .content {
    background-size: cover !important;
  }
  .olive {
    display: none !important;
  }
  table {
    thead {
      th {
        padding: 0 !important;
      }
    }
  }
}
.multiply {
  background: #e9f0f3;
  padding-top: 15px;
  font-family: "微軟雅黑";
  .dialog {
    h2 {
      margin-top: 0;
    }
    .code {
      max-width: 630px;
      border: 1px solid #bde6ff;
      margin: 20px auto;

      .server_seed_hash {
        border-bottom: #bde6ff;
        width: 100%;
        background: rgb(221, 241, 253);
        padding: 5px 0;
        div {
          display: inline-block;
        }
        > div:nth-child(1) {
          width: 30%;
          font-weight: 600;
          color: black;
          vertical-align: middle;
        }
        > div:nth-child(2) {
          width: 68%;
          vertical-align: middle;
          textarea {
            border: 1px solid #bde6ff;
            outline: none;
          }
        }
      }
      .client_seed {
        width: 100%;
        background: #ecf7fc;
        padding: 5px 0;
        border-bottom: #bde6ff;
        div {
          display: inline-block;
        }
        > div:nth-child(1) {
          width: 30%;
          font-weight: 600;
          color: black;
          vertical-align: middle;
        }
        > div:nth-child(2) {
          width: 68%;
          vertical-align: middle;
          padding: 0 6px;
          input {
            width: 100%;
            height: 42px;
            border: 1px solid #bde6ff;
            font-size: 18px;
            padding-left: 10px;
          }
        }
      }
      .server_nonce {
        width: 100%;
        background: rgb(221, 241, 253);
        padding: 14px 0;
        div {
          display: inline-block;
        }
        > div:nth-child(1) {
          width: 30%;
          font-weight: 600;
          color: black;
          vertical-align: middle;
        }
        > div:nth-child(2) {
          width: 68%;
          vertical-align: middle;
        }
      }
    }
    .after_code {
      max-width: 630px;
      border: 1px solid #bde6ff;
      margin: 20px auto 80px;

      .server_seed_hash {
        border-bottom: #bde6ff;
        width: 100%;
        background: rgb(221, 241, 253);
        padding: 5px 0;
        div {
          display: inline-block;
        }
        > div:nth-child(1) {
          width: 30%;
          font-weight: 600;
          color: black;
          vertical-align: middle;
        }
        > div:nth-child(2) {
          width: 68%;
          vertical-align: middle;
          textarea {
            border: 1px solid #bde6ff;
            outline: none;
          }
        }
      }
      .client_seed {
        width: 100%;
        background: #ecf7fc;
        padding: 5px 0;
        border-bottom: #bde6ff;
        div {
          display: inline-block;
        }
        > div:nth-child(1) {
          width: 30%;
          font-weight: 600;
          color: black;
          vertical-align: middle;
        }
        > div:nth-child(2) {
          width: 68%;
          vertical-align: middle;
          padding: 0 6px;
          input {
            width: 100%;
            height: 42px;
            border: 1px solid #bde6ff;
            font-size: 18px;
            padding-left: 10px;
          }
        }
      }
      .server_nonce {
        width: 100%;
        background: rgb(221, 241, 253);
        padding: 14px 0;
        div {
          display: inline-block;
        }
        > div:nth-child(1) {
          width: 30%;
          font-weight: 600;
          color: black;
          vertical-align: middle;
        }
        > div:nth-child(2) {
          width: 68%;
          vertical-align: middle;
        }
      }
    }
  }
  .hint_success {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    border-radius: 6px;
    background: rgb(240, 249, 236);
    padding: 10px 0;
    color: rgb(106, 194, 67);
  }
  .hint_error {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    border-radius: 6px;
    background: rgb(254, 240, 240);
    padding: 10px 0;
    color: rgb(243, 106, 110);
  }
  .head {
    text-align: center;
    span {
      display: inline-block;
      font-size: 20px;
      font-weight: 600;
      vertical-align: bottom;
      a {
        // 父組件的影響 這裏去掉
        padding: 0;
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        text-decoration: underline !important;
        color: #c59f85;
      }
      a:hover {
        color: #ac8466;
      }
    }
    span:nth-child(2) {
      padding: 0 16px;
    }
  }
  .head_child {
    color: #979797;
    margin-top: 22px;
  }
  .content {
    width: 100%;
    min-height: 650px;
    padding: 100px 0;
    background: url("/static/img/reatangle.jpg") no-repeat center;
    .num_clock {
      max-width: 402px;
      width: 100%;
      height: 106px;
      margin: 0 auto;
      padding: 14px 46px;
      background: url("/static/img/team25.png") no-repeat center;
      ul {
        width: 100%;
        height: 76px;
        line-height: 76px;
        li {
          float: left;
          width: 20%;
          height: 100%;
          font-size: 50px;
          color: white;
          overflow: hidden;
          position: relative;
          > ul {
            position: absolute;
            left: 0;
            top: 0;
            > li {
              float: none;
              width: 100%;
            }
          }
        }
      }
    }
    .btn {
      margin: 15px auto 0;
      > div {
        display: inline-block;
        > img:hover {
          opacity: 0.7;
        }
      }
    }
    font {
      color: #f3c23c;
      font-weight: 600;
    }
    .win_hint {
      color: white;
      margin-top: 20px;
    }
    .dashed {
      margin: 5px 130px 10px;
      border-bottom: 2px dashed #194c18;
      position: relative;
      .win_block {
        position: absolute;
        width: 240px;
        height: 200px;
        overflow: hidden;
        border-radius: 3px;
        right: 30px;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        transition: all 1s;
        .win_balance {
          color: black;
          height: 32px;
          line-height: 32px;
          // padding-left: 10px;
          text-align: left;
          // background: linear-gradient(#dba54a, #be7e22);
          position: relative;
          overflow: hidden;
          .account_balance {
            background: linear-gradient(#1f4759, #15344c);
            padding: 0 5px;
            color: white;
          }
          .account_chara {
            color: #edb229;
          }
          .shrink {
            cursor: pointer;
            display: inline-block;
            position: absolute;
            max-width: 24px;
            width: 100%;
            right: 0;
            text-align: center;
          }
          .shrink:hover {
            background: rgba(0, 0, 0, 0.2);
          }
        }
        .chara_success {
          color: #6ac243;
        }
        .chara_error {
          color: #f36a6e;
        }
        .win_balance_info {
          height: 168px;
          text-align: left;
          font-size: 12px;
          padding: 10px;
          overflow: hidden;
          ul {
            margin-bottom: 0;
          }
        }
      }
    }
    .select {
      max-width: 588px;
      width: 100%;
      margin: 0 auto;
      > div {
        display: inline-block;
      }
      .fixaction {
        display: inline-block;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: linear-gradient(#1f4759, #15344c);
        // background: #15324d;
        border: 1px solid #204a5b;
        border-radius: 3px;
        color: white;
        font-weight: 600;
      }
      .shift {
        display: inline-block;
        text-align: center;
        height: 40px;
        line-height: 40px;
        width: 100%;
        border: 1px solid #1d5e2c;
        background: rgba(0, 0, 0, 0.1);
      }
      .select_left {
        text-align: left;
        vertical-align: top;
        padding-right: 5px !important;
        .two {
          margin-top: 10px;
          > span {
            color: white;
            cursor: pointer;
            font-weight: 600;
          }
          > span:hover:nth-child(1) {
            background: linear-gradient(#1f4759, #15344c);
          }
          > span:hover {
            background: rgba(201, 150, 53, 0.5);
          }
        }
        .three {
          margin-top: 5px;
          input {
            width: 100%;
            height: 42px;
            font-weight: 600;
            border: 1px solid #1d5e2c;
            background: rgba(0, 0, 0, 0.1);
            color: #ecb32b;
            text-align: center;
          }
        }
      }
      .select_right {
        text-align: left;
        vertical-align: top;
        padding-left: 5px !important;
        .two {
          margin-top: 4px;
          input {
            background: #1b4e1e;
            color: #edb229;
            text-align: center;
            max-width: 128px;
            width: 100%;
            height: 24px;
            border-radius: 3px;
            font-weight: 600;
          }
          > div {
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
  .content_table {
    background: rgb(51, 45, 47);
    margin-top: 25px;
    .row {
      margin: 0;
      padding: 0;
    }
    // .title {
    //   text-align: left;
    //   border-bottom: 3px solid #565354;
    //   position: relative;
    //   span {
    //     display: inline-block;
    //     text-align: right;
    //     margin: 0;
    //     color: white;
    //     font-weight: 400;
    //     font-size: 16px;
    //     margin-top: 10px;
    //   }
    //   h5 {
    //     display: inline-block;
    //     padding: 2px 3px;
    //     font-weight: 700;
    //     position: relative;
    //     color: rgb(170, 133, 102);
    //     &:after {
    //       content: "";
    //       display: block;
    //       height: 3px;
    //       width: 100%;
    //       background-color: rgb(170, 133, 102);
    //       position: absolute;
    //       bottom: -13px;
    //       left: 0px;
    //     }
    //   }
    //   .write-btn {
    //     position: absolute;
    //     bottom: 6px;
    //     right: 0px;
    //     border-radius: 16px;
    //   }
    // }
    table {
      width: 100%;
      margin-top: 20px;
      thead {
        background: #ac8466;
        th {
          padding: 12px;
          text-align: center;
        }
      }
      tbody {
        tr {
          td {
            padding: 12px;
            color: white;
            font-weight: 300;
            a {
              color: rgb(172, 132, 102);
            }
          }
          td:last-child {
            a:hover {
              color: white;
            }
          }
        }
        tr:nth-child(odd) {
          background: rgb(36, 33, 34);
        }
      }
    }
  }
}
</style>
<style lang="less">
.multiply {
  .el-loading-mask {
    background-color: rgba(255, 255, 255, 0.6);
  }
  .el-message {
    top: 20px !important;
  }
  .el-pagination {
    margin: 20px auto;
    .el-pager li.active {
      background: #ac8466;
      color: white;
    }
    .el-pagination button:hover {
      background: #ac8466;
      color: white;
    }
    button {
      background: #332d2f;
      border: 1px solid #918589;
      color: #908689;
    }
    button:disabled {
      background: #332d2f;
      border: 1px solid #918589;
      color: #908689;
    }
    .el-pager li {
      background: #332d2f;
      border: 1px solid #918589;
      color: #908689;
      margin: 0 2px;
    }
    .is-background .el-pager li:not(.disabled).active {
      background-color: #332d2f !important;
    }
    //   ul {
    //     li {
    //       a {
    //         background: #332d2f;
    //         color: #918589;
    //         border: 1px solid #918589;
    //       }
    //       a:hover {
    //         background: rgb(172, 132, 102);
    //         color: white;
    //       }
    //     }
    //   }
  }
}
</style>

