export default {
    types:['entp','intp','entj','intj','enfp','infp','enfj','infj','estj','istj','esfj','isfj','estp','istp','esfp','isfp'],
    kTypes:[
        {
            t:'nt',
            t4:['entp','intp','entj','intj']
        },
        {
            t:'nf',
            t4:['enfp','infp','enfj','infj']
        },
        {
            t:'sj',
            t4:['estj','istj','esfj','isfj']
        },
        {
            t:'sp',
            t4:['estp','istp','esfp','isfp']
        },
    ],
    func:{
        "intj":["Ni", "Te", "Fi", "Se"],
        "infj":["Ni", "Fe", "Ti", "Se"],
        "entp":["Ne", "Ti", "Fe", "Si"],
        "enfp":["Ne", "Fi", "Te", "Si"],
        "entj":["Te", "Ni", "Se", "Fi"],
        "enfj":["Fe", "Ni", "Se", "Ti"],
        "intp":["Ti", "Ne", "Si", "Fe"],
        "infp":["Fi", "Ne", "Si", "Te"],

        "istj":["Si", "Te", "Fi", "Ne"],
        "isfj":["Si", "Fe", "Ti", "Ne"],
        "istp":["Ti", "Se", "Ni", "Fe"],
        "isfp":["Fi", "Se", "Ni", "Te"],
        "estj":["Te", "Si", "Ne", "Fi"],
        "esfj":["Fe", "Si", "Ne", "Ti"],
        "estp":["Se", "Ti", "Fe", "Ni"],
        "esfp":["Se", "Fi", "Te", "Ni"],
    },
    color:{
        "N":"#fde428",
        "S":"#13bc59",
        "F":"#db0626",
        "T":"#05cdff"
    }
    
}