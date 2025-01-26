import HeroHeader from '@/components/homes/heroHeader';
import { HomeCards } from '@/lib/constants';
import { THomeCard } from '@/types';
import { Button, Link } from '@heroui/react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="h-full w-full flex flex-col">
        <section className="h-[600px] bg-sky">
          <HeroHeader />
        </section>
        <section className="h-1/2 w-full px-3 xl:px-12 py-5 xl:py-12 bg-white grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-10">
          {HomeCards.map((item: THomeCard, index: number) => (
            <div
              key={item.key + index.toString()}
              aria-label={item.label}
              className="w-full bg-foreground-300 shadow-xl flex flex-col gap-5 rounded-3xl p-5"
            >
              <Image
                width={150}
                height={50}
                src={item.image}
                alt={item.label}
              />
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-xl">{item.title}</span>
                <span className="font-medium">{item.description}</span>
              </div>
              <Button
                as={Link}
                size="lg"
                isExternal={item.isExternal}
                aria-label={item.label}
                href={item.link}
                showAnchorIcon={true}
                radius="full"
                className="w-full bg-sky font-semibold"
              >
                {item.label}
              </Button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
