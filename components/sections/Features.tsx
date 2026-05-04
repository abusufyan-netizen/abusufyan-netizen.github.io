import Card from '../ui/Card'

const features = [
  {
    title: 'Easy to Use',
    description: 'Simple, intuitive interfaces for all tools',
    icon: '⚡'
  },
  {
    title: 'Privacy First',
    description: 'All processing happens in your browser',
    icon: '🔒'
  },
  {
    title: 'Free Forever',
    description: 'No costs, no subscriptions, no limits',
    icon: '🎯'
  }
]

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose WebToolkit Pro?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}