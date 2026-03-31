'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// 打字机效果组件
function TypeWriter({ text, speed = 100, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, started]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// 滚动渐入效果
function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// 工作经历数据
const experiences = [
  {
    company: '腾讯科技(深圳)有限公司',
    period: '2019.07 - 2025.09',
    role: '角色原画 / 角色原画组长',
    projects: [
      {
        name: '《洛克王国·世界》',
        period: '2025.02 - 2025.09',
        description: '负责二次元开放世界项目的角色服装设计，完成角色概念设计与三视图绘制，并对接外包制作流程',
      },
      {
        name: '《宝可梦大集结》',
        period: '2023.9 - 2025.02',
        description: '角色原画组长，负责审核项目美术资源，制定美术相关规范，团队人员培养与招聘工作',
      },
    ],
  },
  {
    company: '腾讯科技(深圳)有限公司',
    period: '2018.07 - 2018.09',
    role: '角色原画实习生',
    projects: [
      {
        name: '《传说对决 | ARENA OF VALOR》',
        period: '2018.07 - 2018.09',
        description: '负责英雄皮肤设计，英雄KV外包反馈对接',
      },
    ],
  },
];

// 作品数据 - 从PDF中提取的图片
const works = [
  {
    title: '达克莱伊 - 赛博潮流服饰',
    category: '宝可梦大集结',
    image: 'https://aka.doubaocdn.com/s/d5s41wA7Nq',
    description: '赛博潮流服饰+黑客元素设计',
  },
  {
    title: '角色三视图系统',
    category: '宝可梦大集结',
    image: 'https://aka.doubaocdn.com/s/ri0D1wA7Nq',
    description: '制定三视图规范，确保生产落地',
  },
  {
    title: '角色原画设计',
    category: '宝可梦大集结',
    image: 'https://aka.doubaocdn.com/s/cNZB1wA7Nq',
    description: '角色三视图及实机效果',
  },
  {
    title: '宝可梦原画设计',
    category: '宝可梦大集结',
    image: 'https://aka.doubaocdn.com/s/0N3I1wA7Nq',
    description: '针对不同体型的宝可梦量身定制服装',
  },
  {
    title: '九尾极光',
    category: '宝可梦大集结',
    image: 'https://aka.doubaocdn.com/s/THmj1wA7Nq',
    description: '宝可梦三视图及实机效果',
  },
  {
    title: '自研项目风格预研',
    category: '自研项目',
    image: 'https://aka.doubaocdn.com/s/chip1wA7Nq',
    description: '二次元TPS新项目角色设计探索',
  },
  {
    title: '风格预研 - 角色设计',
    category: '自研项目',
    image: 'https://aka.doubaocdn.com/s/3XFs1wA7Nq',
    description: '角色设计部分风格探索',
  },
  {
    title: 'ROOKIVE系列',
    category: '个人作品',
    image: 'https://aka.doubaocdn.com/s/rVN61wA7Nq',
    description: '个人原创角色设计',
  },
  {
    title: 'ROOKIVE - SR',
    category: '个人作品',
    image: 'https://aka.doubaocdn.com/s/niYq1wA7Nq',
    description: '原创角色设计',
  },
  {
    title: 'PINK练习',
    category: '个人作品',
    image: 'https://aka.doubaocdn.com/s/2EBi1wA7Nq',
    description: '粉色系角色练习',
  },
  {
    title: 'NOEL',
    category: '个人作品',
    image: 'https://aka.doubaocdn.com/s/WzCp1wA7Nq',
    description: '圣诞节主题角色设计',
  },
  {
    title: '冬奥会主题',
    category: '个人作品',
    image: 'https://aka.doubaocdn.com/s/bkUZ1wA7Nq',
    description: 'BEIJING 2022 奥运主题设计',
  },
  {
    title: '疯狂动物城拟人设计',
    category: '同人作品',
    image: 'https://aka.doubaocdn.com/s/3oEu1wA7Nq',
    description: '疯狂动物城角色拟人化设计',
  },
  {
    title: '初音未来同人',
    category: '同人作品',
    image: 'https://aka.doubaocdn.com/s/SZiF1wA7Nq',
    description: '初音未来同人作品',
  },
];

// 技能标签
const skills = [
  '角色原画', '三视图绘制', '服装设计', '二次元风格', 
  'QQ人画风', '美少女角色', '概念设计', 'Photoshop',
  'Blender', 'AI辅助工具', '团队管理', '外包对接'
];

export default function HomePage() {
  const heroRef = useIntersectionObserver();
  const aboutRef = useIntersectionObserver();
  const experienceRef = useIntersectionObserver();
  const worksRef = useIntersectionObserver();
  const contactRef = useIntersectionObserver();

  const [selectedCategory, setSelectedCategory] = useState('全部');
  const categories = ['全部', '宝可梦大集结', '自研项目', '个人作品', '同人作品'];
  
  const filteredWorks = selectedCategory === '全部' 
    ? works 
    : works.filter(w => w.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-gradient">Rookive</span>
          <div className="hidden md:flex gap-8">
            {['关于', '经历', '作品', '联系'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef.ref as any}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chart-3/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <TypeWriter text="周琪雯" speed={200} delay={500} />
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            角色原画 · 游戏美术
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
            10年腾讯游戏美术经验，擅长美少女角色设计与QQ人画风<br />
            成都人 · 美术生 · 小众音乐爱好者
          </p>
          
          <div className="mt-12 flex gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
            <a
              href="#作品"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              查看作品
            </a>
            <a
              href="#联系"
              className="px-8 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors"
            >
              联系我
            </a>
          </div>
        </div>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="关于" className="py-32 px-6" ref={aboutRef.ref as any}>
        <div className="max-w-6xl mx-auto">
          <div className={`grid md:grid-cols-2 gap-16 items-center ${aboutRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gradient">关于我</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                多年游戏角色原画经验，参与过二次元3D及换装类项目开发，具备完整的角色设计与制作落地经验。
                熟悉游戏美术制作管线，对角色概念设计、三视图绘制及3D制作流程有深入理解。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                作为一个成都人，我有着大大咧咧的性格，但私下也喜欢各种漂亮的东西，有着小女生的一面。
                喜欢小众音乐，画过很多美少女，特别钟爱QQ人的画风。
              </p>
              
              {/* 技能标签 */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">年游戏美术经验</div>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-muted-foreground">腾讯重点项目</div>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">角色设计作品</div>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="text-4xl font-bold text-primary mb-2">四川</div>
                <div className="text-muted-foreground">美术学院毕业</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="经历" className="py-32 px-6 bg-muted/30" ref={experienceRef.ref as any}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-16 text-center text-gradient ${experienceRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            工作经历
          </h2>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary/30 -translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative grid md:grid-cols-2 gap-8 mb-16 ${
                  experienceRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* 时间线圆点 */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 top-8" />

                {/* 内容 */}
                <div className={`${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'}`}>
                  <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors">
                    <div className="text-primary font-medium mb-2">{exp.period}</div>
                    <h3 className="text-xl font-bold mb-2">{exp.company}</h3>
                    <div className="text-muted-foreground mb-4">{exp.role}</div>
                    
                    {exp.projects.map((project, pIndex) => (
                      <div key={pIndex} className={`${index % 2 === 0 ? 'md:text-right' : ''} mb-3 last:mb-0`}>
                        <div className="font-medium text-foreground">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.period}</div>
                        <div className="text-sm text-muted-foreground mt-1">{project.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 教育经历 */}
          <div className={`mt-16 p-8 bg-card rounded-2xl border border-border ${experienceRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-bold mb-4">教育经历</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <div className="font-bold">四川美术学院</div>
                <div className="text-muted-foreground">本科 · 游戏设计专业 · 2015.09 - 2019.06</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="作品" className="py-32 px-6" ref={worksRef.ref as any}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold mb-8 text-center text-gradient ${worksRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            作品集
          </h2>

          {/* 分类筛选 */}
          <div className={`flex flex-wrap justify-center gap-2 mb-12 ${worksRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 作品网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work, index) => (
              <div
                key={work.title}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card ${
                  worksRef.isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-primary font-medium mb-1">{work.category}</div>
                  <h3 className="font-bold mb-1">{work.title}</h3>
                  <p className="text-sm text-muted-foreground">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="联系" className="py-32 px-6 bg-muted/30" ref={contactRef.ref as any}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-8 text-gradient ${contactRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            联系我
          </h2>
          <p className={`text-lg text-muted-foreground mb-12 ${contactRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            如果您对我的作品感兴趣，欢迎随时联系
          </p>

          <div className={`grid md:grid-cols-3 gap-6 ${contactRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <a
              href="tel:18523081763"
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="font-medium mb-1">电话</div>
              <div className="text-muted-foreground">185-2308-1763</div>
            </a>

            <a
              href="mailto:617483149@qq.com"
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="font-medium mb-1">邮箱</div>
              <div className="text-muted-foreground">617483149@qq.com</div>
            </a>

            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c4.801 0 8.692-3.287 8.692-7.342 0-4.054-3.89-7.341-8.692-7.341zM5.785 10.09a1.03 1.03 0 110-2.058 1.03 1.03 0 010 2.057zm5.812 0a1.03 1.03 0 110-2.058 1.03 1.03 0 010 2.057zm8.403 4.15c1.854-1.347 3-3.339 3-5.55 0-2.14-1.059-4.082-2.791-5.426a8.08 8.08 0 01.541 2.918c0 4.055-3.89 7.342-8.692 7.342-.78 0-1.534-.082-2.258-.237 1.487 1.95 4.183 3.253 7.316 3.253a10.16 10.16 0 002.837-.403.864.864 0 01.717.098l1.903 1.114a.326.326 0 00.167.054c.16 0 .29-.132.29-.295 0-.072-.03-.143-.048-.213l-.39-1.48a.59.59 0 01.214-.665z"/>
                </svg>
              </div>
              <div className="font-medium mb-1">微信</div>
              <div className="text-muted-foreground">Rookive12</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © 2025 周琪雯. All rights reserved.
          </div>
          <div className="text-muted-foreground text-sm">
            Made with ❤️ in Chengdu
          </div>
        </div>
      </footer>
    </div>
  );
}
