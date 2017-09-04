1.执行serve后，每当*.coffee有变化，则编译coffee然后在reload服务器

2.关于检测滚出屏幕的空位置
	数据中每个座位存有距离左上角的距离
	，查看该数据中的clicked、people、occupied属性，如果发现有clicked为假并且occupied也为假时，则游戏结束

3.关于什么时候重排座位
     先走第一幅，快到第二幅时，走第二幅，
     (1)找到
	