import { useState, useEffect } from 'react'
import { Camera, Clock, Tag, Heart } from 'lucide-react'

const ServiceCard = () => {
  const [services, setServices] = useState([])
  const [likedServices, setLikedServices] = useState(new Set())
  const [hoveredCard, setHoveredCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handlePayment = (service) => {
    alert(`Proceeding to payment for: ${service.title} - ₹${service.price}`)
  }

  const toggleLike = (serviceId) => {
    setLikedServices(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(serviceId)) {
        newLiked.delete(serviceId)
      } else {
        newLiked.add(serviceId)
      }
      return newLiked
    })
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8080/api/services', {
          method: 'GET',
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("data", data)
        setServices(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching services:', error)
        setError('Failed to load services. Please try again later.')
    
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  if (error && services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Our Photography Services
        </h1>
        
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded">
            <p>{error} Showing sample data instead.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const isHovered = hoveredCard === service._id
            const isLiked = likedServices.has(service._id)
            
            return (
              <div key={service._id} className="flex justify-center">
                <div 
                  className={`relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 ${
                    isHovered ? 'scale-105 shadow-3xl' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHoveredCard(service._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                  
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(service._id)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        isLiked 
                          ? 'bg-red-500 text-white shadow-lg' 
                          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                      }`}
                    >
                      <Heart 
                        size={20} 
                        className={`transition-transform duration-300 ${
                          isLiked ? 'fill-current scale-110' : 'scale-100'
                        }`} 
                      />
                    </button>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 backdrop-blur-sm">
                        <Tag size={12} className="mr-1" />
                        {service.category || 'General'}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Rating */}
                    {service.rating && (
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-200'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {service.rating} ({service.reviews || 0} reviews)
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Service Details */}
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-indigo-500" />
                        <span>{service.duration} mins</span>
                      </div>
                      <div className="flex items-center">
                        <Camera size={16} className="mr-1 text-indigo-500" />
                        <span>{service.category}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-3xl font-bold text-indigo-600">₹{service.price?.toLocaleString()}</span>
                        <span className="text-gray-500 text-sm ml-1">/ session</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handlePayment(service)}
                      className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 transform ${
                        isHovered
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg scale-105'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                      } hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-95`}
                    >
                      Book Now -With Minimum Upfronts ₹{service.price*10/100?.toLocaleString()}
                    </button>

                    {/* Additional Info */}
                    <p className="text-xs text-gray-400 text-center mt-3">
                      Secure payment • Instant confirmation • 24/7 support
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServiceCard