// example库，存储实例相关信息
[
    {
        eid:'e001',
        name:'克林顿',
        sex:'',
        type:'intj',
        img:'',
        birth:'1987-3-3',
        info:'人物说明',
        vote:{
            'i':11,
            'e':123,
            's':1,
            'n':2,
            't':44,
            'f':1,
            'j':99,
            'p':88
        }, 
        // // 评论
        // comment:[
        //     {
        //         uid:'u001',
        //         time:'2002-2-2',
        //         content:'评论内容',
        //         agree:123, //点赞数
        //         agreeList:['uid001','uid002']
        //     }
        // ]
    }
]
// comment评论
[
    {
        eid:'eid',
        comment:[
            {
            uid:'u001',
            time:'2002-2-2',
            content:'评论内容',
            agree:123, //点赞数
            agreeList:['uid001','uid002']
            }
        ]
    }
]

// user库
[
    {
        _id:'',
        name:'卜广',
        sex:'1',
        regTime:'2017-4-4',
        email:'',
        phone:'',
        // 投票结果
        voteList:[
            {
                eid:'e002',  //通过eid,可读取评论内容
                name:'汪峰',
                res:'in*j'
            }
        ],
        // 评论过的uid
        commentEID:['e05','e06' ],
        msg:{
            birth:'2011-1-1 03:33:11',
            homeTown:'广西玉林',
            address:'广东广州',
            like:'编程、看书、画画',
            education:'专科'
        }
    }
]