// server/controllers/services.js
const Service = require('../models/Service');
const Category = require('../models/Category');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    let query = {};
    
    // Filter by active status
    if (req.query.active) {
      query.isActive = req.query.active === 'true';
    }
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by city
    if (req.query.city) {
      query['location.city'] = new RegExp(req.query.city, 'i');
    }
    
    // Filter by language
    if (req.query.language) {
      query.languages = { $in: [req.query.language] };
    }
    
    const services = await Service.find(query)
      .populate('category', 'name icon')
      .sort('name');
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('category', 'name description icon');
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      category, 
      provider, 
      location, 
      contact, 
      languages 
    } = req.body;
    
    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }
    
    const service = await Service.create({
      name,
      description,
      category,
      provider,
      location,
      contact,
      languages,
      isActive: true
    });
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Check if category exists if being updated
    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
      }
    }
    
    // Update service fields
    const updatedFields = {};
    const allowedFields = [
      'name', 'description', 'category', 'provider', 
      'location', 'contact', 'languages', 'isActive'
    ];
    
    // Only update provided fields
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updatedFields[field] = req.body[field];
      }
    });
    
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { ...updatedFields, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('category', 'name icon');
    
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    await service.deleteOne();
    
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};