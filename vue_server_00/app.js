
//app.js
//1:加载模块 express pool.js
const express = require("express");
const pool = require("./pool");
//2:创建服务器端对象
var app = express();


app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); // 可以带cookies
    if(req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


//3:监听 3000
app.listen(3000);
//4:指定静态目录  public 
app.use(express.static("public"));
//5:加载跨域访问模块
const cors = require("cors");
//6:配置跨域访问模块 那个域名跨域访问允许
//  脚手架8080允许
//origin      允许跨域访问域名列表
//credentials 跨域访问保存session id
app.use(cors({
  origin:["http://127.0.0.1:8080",
  "http://localhost:8080"],
  credentials:true
}));
//6.1:下载 express-session 并且配置
const session = require("express-session");
app.use(session({
  secret:"128位随机字符", //安全字符串
  resave:false,          //每次请求是否都更新数据
  saveUninitialized:true, //初始化时保存数据
  cookie:{
    maxAge:1000 * 60 * 60 * 8
  }
}));


//7:加载第三方模块 body-parser
//body-parser 针对post请求处理请求参数
//如果配置成功 req.body..
const bodyParser = require("body-parser");
//8:配置对特殊 json是否是自动转换 不转换
app.use(bodyParser.urlencoded({extended:false}))


//功能一:home 组件轮播图片  
app.get("/gameList",(req,res)=>{
   //1:将轮播图中所需图片 复制public/img
   //2:查询
   var game = {
    navShow:true,
    items:[{text:"我的关注"},
      {text:"排行榜"},
      {text:"视频中心"},
      {text:"赛事"}],  
    items2:[{text:"关注"},
      {text:"排行"},
      {text:"视频"},
      {text:"赛事"}],  
    navList:[
      "网游竞技","热门单机","休闲手游"
    ],  
    game:["英雄联盟",
        "DNF",
        "DOTA2",
        "穿越火线",
        "APEX英雄",
        "炉石传说",
        "CS:GO",
        "逆战",
        "魔兽争霸",
        "DOTA",
        "魔兽世界",
        "刀塔自走棋",
        "逆水寒",
        "堡垒之夜",
        "守望先锋"]
    }
   res.send(game); 
});


app.get("/banner",(req,res)=>{
   //1:将轮播图中所需图片 复制public/img
   //2:查询
   var banners = [
	  "http://127.0.0.1:3000/test2/img/banner1.png", 
	  "http://127.0.0.1:3000/test2/img/banner2.png", 
	  "http://127.0.0.1:3000/test2/img/banner3.png", 
	  "http://127.0.0.1:3000/test2/img/banner4.png", 
   ]

   res.send(banners); 
});

app.get("/content",(req,res)=>{
var content = {
    leftList:[
		{text:"盛家六姑娘明兰从小聪颖貌美，却遭遇嫡母不慈，姐妹难缠，父亲不重视，生母被害去世的困境。她藏起聪慧，掩埋锋芒，忍辱负重逆境成长，在万般打压之下依然自立自强，终历尽艰难为母报仇。在这一过程中，明兰结识了宁远侯府二公子顾廷烨。顾廷烨帮过明兰，也刻薄过明兰，他见过明兰软糯表皮下的聪慧锐利，也见过她刚强性格中的脆弱孤单，对她早已倾心。朝廷风云变幻，在顾廷烨的拥戴下，赵家旁支宗室子弟被立为太子，顾廷烨拿着勤王诏书，大破反贼，而后拥立新帝，成为新朝第一功臣，略施巧计娶了明兰为妻。明兰婚后管家业、整侯府、铲奸佞、除宵小，夫妻二人解除误会建立了深厚的感情，最终明兰与丈夫一同协助明君巩固政权，二人也收获了美满的人生",imgUrl:"zf.jpg",playNumber:272,isHover:false},
		{text:"该剧讲述了出生底层的平凡少女扶摇，为解救同伴奋而下山踏上五洲历险征途，在此过程中意外结识长孙无极，并与其相知相爱并肩而立；两人坚守“虽千万人吾往矣”的信念，历经磨难披荆斩棘，最终成功对抗不公的命运。",imgUrl:"fy.jpg",playNumber:176,isHover:false},
		{text:"乾隆六年，少女魏璎珞为寻求长姐死亡真相，入紫禁城为宫女。经调查，璎珞证实姐姐之死与荒唐王爷弘昼有关，立志要讨回公道。富察皇后娴于礼法，担心璎珞走上歧途，竭力给予她温暖与帮助。在皇后的悉心教导下，魏璎珞一步步成长为正直坚强的宫廷女官，并放下怨恨、认真生活。皇后不幸崩逝，令璎珞对乾隆误会重重，二人从互相敌视到最终彼此理解、互相扶持。璎珞凭勇往直前的勇气、机敏灵活的头脑、宽广博大的胸怀，化解宫廷上下的重重困难，最终成为襄助乾隆盛世的令贵妃。直到璎珞去世前，她才将当年富察皇后临终托付告知乾隆，即望她陪伴弘历身边，辅助他做一个有为明君，乾隆终知富察氏用心良苦。乾隆六十年，乾隆帝宣示魏璎珞之子嘉亲王永琰为皇太子，同时追封皇太子生母令懿皇贵妃为孝仪皇后，璎珞终于用自己的一生，实现了对富察皇后的承诺。",imgUrl:"yxgl.jpg",playNumber:322,isHover:false},
		{text:"公元1735年乾隆（霍建华饰）即位，与他少年相知的侧福晋如懿（周迅饰）也依礼进宫为妃。从此，二人在宫廷里演绎了一段从恩爱相知到迷失破灭的婚姻历程。新帝登基，如懿因与乾隆青梅竹马的情分成为娴妃，由此受到众人排挤，而太后（邬君梅饰)又与如懿家族有世仇，如懿危机四伏。此时，乾隆也同样面对太后掌权和老臣把持朝政的难题。权力更迭过程中，乾隆与如懿互相扶持，共同渡过难关，直到二人扫清障碍。乾隆经过多年努力也如愿将如懿推到皇后位置，与他共有天下。然而做了皇后的如懿却发现，乾隆已从少年夫君成长为成熟帝王，他的多疑善变以及帝王自私不断显露，两人间的情意信任渐渐破灭。但如懿依旧坚守美好回忆，恪守皇后职责，直到去世。",imgUrl:"ryz.jpg",playNumber:192,isHover:false},
    ],
    rightList:["皓镧传","知否","逆流而上","孤独皇后","招摇","天衣无缝"],
    imgList:["hyz-s.jpg","zf-s.jpg", "nlrs-s.jpg", "gdhh-s.jpg", "zy-s.jpg", "tywf-s.jpg"],
	marginTop:0
  }
res.send(content); 
});

app.get("/login",(req,res)=>{
 //参数
 var uname = req.query.uname;
 var upwd = req.query.upwd;
 //sql
 var sql = " SELECT id FROM xz_login";
      sql+=" WHERE uname = ? AND upwd = md5(?)";
 pool.query(sql,[uname,upwd],(err,result)=>{
    if(err)throw err;  
    if(result.length==0){
      res.send({code:-1,msg:"用户名或密码有误"});
    }else{
      //将用户登录凭证保存在服务器端 session对象中
      res.send({code:1,msg:"登录成功"});
    }
 });
})
