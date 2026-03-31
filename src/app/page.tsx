'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  ArrowUpRight,
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

// 交互卡片组件 - 带鼠标悬停效果
function InteractiveCard({
  children,
  className = '',
  hoverScale = 1.02,
  hoverY = -4,
}: {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? hoverScale : 1,
        y: isHovered ? hoverY : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 图标按钮悬停效果
function IconButton({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        animate={{ rotate: isHovered ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <Icon size={18} />
      </motion.span>
      <span>{label}</span>
    </motion.a>
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
          <motion.a
            href="#"
            className="text-xl sm:text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rookive
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
            <motion.a
              href="#contact"
              className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium"
              whileHover={{ scale: 1.05, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
            >
              联系我
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white border-b border-border"
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
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// 导航链接悬停效果
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-foreground"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </a>
  );
}

// Hero 区域
function HeroSection() {
  const [isHoveredWork, setIsHoveredWork] = useState(false);
  const [isHoveredAbout, setIsHoveredAbout] = useState(false);

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
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={16} />
            </motion.span>
            <span>角色原画 · 游戏美术</span>
          </motion.div>

          {/* 主标题 */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              周琪雯
            </motion.span>
            <motion.span
              className="block text-muted-foreground text-3xl sm:text-4xl md:text-5xl mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              角色原画作品集
            </motion.span>
          </h1>

          {/* 描述 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            10年腾讯游戏美术经验，擅长美少女角色设计与QQ人画风。
            <br className="hidden sm:block" />
            成都人 · 美术生 · 小众音乐爱好者
          </motion.p>

          {/* 按钮组 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            {/* 查看作品按钮 */}
            <motion.a
              href="#works"
              onMouseEnter={() => setIsHoveredWork(true)}
              onMouseLeave={() => setIsHoveredWork(false)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>查看作品</span>
              <motion.span
                animate={{ x: isHoveredWork ? 4 : 0, rotate: isHoveredWork ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </motion.a>

            {/* 了解更多按钮 */}
            <motion.a
              href="#about"
              onMouseEnter={() => setIsHoveredAbout(true)}
              onMouseLeave={() => setIsHoveredAbout(false)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-foreground rounded-full font-medium"
              whileHover={{ scale: 1.05, backgroundColor: '#E5E7EB' }}
              whileTap={{ scale: 0.98 }}
            >
              <span>了解更多</span>
              <motion.span
                animate={{ x: isHoveredAbout ? 4 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* 向下滚动 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <ChevronDown size={20} />
          </motion.a>
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

// 特性卡片组件
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group p-8 bg-card rounded-2xl border border-border transition-all duration-300"
      animate={{
        y: isHovered ? -8 : 0,
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)'
          : '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="w-12 h-12 flex items-center justify-center bg-secondary rounded-xl mb-6"
        animate={{
          backgroundColor: isHovered ? '#111827' : '#F3F4F6',
          color: isHovered ? '#FFFFFF' : '#111827',
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={24} />
      </motion.div>
      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

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
            <FeatureCard key={feature.title} feature={feature} index={index} />
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

// 作品卡片组件
function WorkCard({ work, index }: { work: typeof works[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-card rounded-2xl overflow-hidden border border-border"
      style={{
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)'
          : '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <motion.img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
            <ArrowUpRight size={20} className="text-foreground" />
          </div>
        </motion.div>
      </div>
      <div className="p-6">
        <motion.span
          className="text-xs font-medium text-muted-foreground inline-block"
          animate={{ color: isHovered ? '#111827' : '#6B7280' }}
        >
          {work.category}
        </motion.span>
        <h3 className="text-lg font-bold mt-1 mb-2">{work.title}</h3>
        <p className="text-sm text-muted-foreground">{work.description}</p>
      </div>
    </motion.div>
  );
}

// 作品展示区
function WorksSection() {
  const [filter, setFilter] = useState('全部');
  const [activeFilter, setActiveFilter] = useState('全部');
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
                <motion.button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setActiveFilter(cat);
                  }}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === cat
                      ? 'bg-foreground text-background'
                      : 'bg-card text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, index) => (
              <WorkCard key={work.title} work={work} index={index} />
            ))}
          </AnimatePresence>
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

// 经历卡片
function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-6 sm:p-8 bg-card rounded-2xl border border-border transition-all duration-300"
      animate={{
        y: isHovered ? -4 : 0,
        boxShadow: isHovered
          ? '0 16px 32px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.04)'
          : '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">{exp.company}</h3>
          <p className="text-muted-foreground mt-1">{exp.role}</p>
          {exp.projects.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {exp.projects.map((project) => (
                <motion.span
                  key={project}
                  className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                  animate={{
                    backgroundColor: isHovered ? '#E5E7EB' : '#F3F4F6',
                  }}
                >
                  {project}
                </motion.span>
              ))}
            </div>
          )}
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
      </div>
    </motion.div>
  );
}

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
              <ExperienceCard exp={exp} index={index} />
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

// 联系卡片
function ContactCard({ contact }: { contact: typeof contacts[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = contact.icon;

  return (
    <motion.a
      href={contact.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group p-8 bg-card rounded-2xl border border-border text-center block"
      animate={{
        y: isHovered ? -8 : 0,
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)'
          : '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="w-14 h-14 flex items-center justify-center bg-secondary rounded-xl mx-auto mb-4"
        animate={{
          backgroundColor: isHovered ? '#111827' : '#F3F4F6',
          color: isHovered ? '#FFFFFF' : '#111827',
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={24} />
      </motion.div>
      <p className="text-sm text-muted-foreground mb-1">{contact.label}</p>
      <p className="font-medium">{contact.value}</p>
    </motion.a>
  );
}

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
            <ContactCard key={contact.label} contact={contact} />
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
            <motion.p
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              style={{ cursor: 'default' }}
            >
              Rookive
            </motion.p>
            <p className="text-sm text-muted-foreground mt-1">角色原画 · 游戏美术</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {['关于', '作品', '联系'].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
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
