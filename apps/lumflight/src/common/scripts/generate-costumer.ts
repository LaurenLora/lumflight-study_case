import { Customer } from 'src/costumer/entities/customer.entity';

export const generateCustomer = (flightId: string): Customer => {
  const names = [
    'Ali',
    'Veli',
    'Ayşe',
    'Fatma',
    'Mehmet',
    'Zeynep',
    'Ahmet',
    'Elif',
  ];
  const lastNames = [
    'Yılmaz',
    'Kaya',
    'Demir',
    'Çelik',
    'Şahin',
    'Arslan',
    'Koç',
    'Aksoy',
  ];
  const domains = ['gmail.com', 'hotmail.com', 'yahoo.com'];
  const comments = [
    'Mükemmel bir deneyimdi!',
    'Personel çok yardımcı oldu.',
    'Uçuş biraz gecikti ama genel olarak iyiydi.',
    'Yemekler çok lezzetliydi.',
    'Bir dahaki sefere tekrar tercih ederim.',
    'Koltuklar rahat değildi.',
    'Hizmet kalitesi çok yüksekti.',
    'Uçuş ekibi çok profesyoneldi.',
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const randomComment = comments[Math.floor(Math.random() * comments.length)];
  const email = `${randomName.toLowerCase()}${randomLastName.toLowerCase()}${Math.floor(Math.random() * 100)}@${randomDomain}`;

  return new Customer({
    name: randomName,
    lastname: randomLastName,
    email,
    flightId,
    comment: randomComment,
  });
};
