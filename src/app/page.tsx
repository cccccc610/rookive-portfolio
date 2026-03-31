'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Palette,
  Sparkles,
  Users,
  Layers,
  Zap,
  Award,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

// 动画配置
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// 滚动动画组件
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// 导航栏组件
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 20);
    });
  }

  const navLinks = [
    { name: '关于', href: '#about' },
    { name: '作品', href: '#works' },
    { name: '经历', href: '#experience' },
    { name: '联系', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="text-xl sm:text-2xl font-bold tracking-tight">
            Rookive
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              联系我
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3 bg-foreground text-background rounded-full font-medium"
              >
                联系我
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

// Hero 区域
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-50 rounded-full blur-3xl opacity-80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* 小标签 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium"
          >
            <Sparkles size={16} />
            <span>角色原画 · 游戏美术</span>
          </motion.div>

          {/* 主标题 */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            <span className="block">周琪雯</span>
            <span className="block text-muted-foreground text-3xl sm:text-4xl md:text-5xl mt-4">
              角色原画作品集
            </span>
          </h1>

          {/* 描述 */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
            10年腾讯游戏美术经验，擅长美少女角色设计与QQ人画风。
            <br className="hidden sm:block" />
            成都人 · 美术生 · 小众音乐爱好者
          </p>

          {/* 按钮组 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              查看作品
              <ExternalLink size={18} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-foreground rounded-full font-medium hover:bg-muted transition-colors"
            >
              了解更多
            </a>
          </motion.div>
        </motion.div>

        {/* 向下滚动 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <ChevronDown size={20} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// 特性卡片数据
const features = [
  {
    icon: Palette,
    title: '角色原画',
    description: '擅长二次元风格角色设计，多年游戏美术制作经验，能够完成从概念到落地的全流程设计。',
  },
  {
    icon: Layers,
    title: '三视图绘制',
    description: '制定三视图规范，确保设计稿能够精准还原到3D模型，与建模团队紧密协作。',
  },
  {
    icon: Sparkles,
    title: 'QQ人画风',
    description: '独特的美少女角色设计风格，擅长可爱、活泼的角色形象塑造，深受玩家喜爱。',
  },
  {
    icon: Users,
    title: '团队协作',
    description: '具备良好的跨部门协作能力，能够把控角色美术品质，参与设计规范制定与成员指导。',
  },
  {
    icon: Zap,
    title: '效率优先',
    description: '熟练使用PS、Blender及各类AI辅助工具，提高设计与制作效率，保证交付质量。',
  },
  {
    icon: Award,
    title: '项目经验',
    description: '参与《宝可梦大集结》《洛克王国·世界》等重点项目，具备完整的角色设计与落地经验。',
  },
];

// 特性展示区
function FeaturesSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">专业能力</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              多年游戏角色原画经验，参与过二次元3D及换装类项目开发
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="group p-8 bg-card rounded-2xl border border-border card-shadow hover:border-muted-foreground/20"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-xl mb-6 group-hover:bg-foreground group-hover:text-background transition-colors">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// 作品数据
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
    title: 'ROOKIVE系列',
    category: '个人作品',
    image: 'https://aka.doubaocdn.com/s/rVN61wA7Nq',
    description: '个人原创角色设计',
  },
];

// 作品展示区
function WorksSection() {
  const [filter, setFilter] = useState('全部');
  const categories = ['全部', '宝可梦大集结', '个人作品', '同人作品'];

  const filteredWorks = filter === '全部' ? works : works.filter((w) => w.category === filter);

  return (
    <section id="works" className="py-24 sm:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">精选作品</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              展示部分项目作品与个人创作
            </p>

            {/* 筛选按钮 */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat
                      ? 'bg-foreground text-background'
                      : 'bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border card-shadow"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-muted-foreground">{work.category}</span>
                <h3 className="text-lg font-bold mt-1 mb-2">{work.title}</h3>
                <p className="text-sm text-muted-foreground">{work.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// 工作经历
const experiences = [
  {
    company: '腾讯科技(深圳)有限公司',
    role: '角色原画 / 角色原画组长',
    period: '2019.07 - 2025.09',
    projects: ['《洛克王国·世界》', '《宝可梦大集结》'],
  },
  {
    company: '腾讯科技(深圳)有限公司',
    role: '角色原画实习生',
    period: '2018.07 - 2018.09',
    projects: ['《传说对决 | ARENA OF VALOR》'],
  },
  {
    company: '四川美术学院',
    role: '本科 · 游戏设计专业',
    period: '2015.09 - 2019.06',
    projects: [],
  },
];

// 经历区域
function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">工作经历</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              从实习到组长，10年腾讯游戏美术成长之路
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.company} delay={index * 0.1}>
              <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border card-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <p className="text-muted-foreground mt-1">{exp.role}</p>
                    {exp.projects.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.projects.map((project) => (
                          <span
                            key={project}
                            className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// 联系方式
const contacts = [
  { icon: Phone, label: '电话', value: '185-2308-1763', href: 'tel:18523081763' },
  { icon: Mail, label: '邮箱', value: '617483149@qq.com', href: 'mailto:617483149@qq.com' },
  { icon: MapPin, label: '位置', value: '成都', href: '#' },
];

// 联系区域
function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">联系我</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              如果您对我的作品感兴趣，欢迎随时联系
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {contacts.map((contact) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              variants={fadeInUp}
              className="group p-8 bg-card rounded-2xl border border-border card-shadow text-center hover:border-muted-foreground/20 transition-all"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-secondary rounded-xl mx-auto mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                <contact.icon size={24} />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{contact.label}</p>
              <p className="font-medium">{contact.value}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// 页脚
function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold">Rookive</p>
            <p className="text-sm text-muted-foreground mt-1">角色原画 · 游戏美术</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">
              关于
            </a>
            <a href="#works" className="hover:text-foreground transition-colors">
              作品
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              联系
            </a>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 周琪雯. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// 主页面
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorksSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
